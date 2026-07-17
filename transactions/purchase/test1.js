const db = require("../../db_config/db.js");

const createPurchase = (purchaseData, callback) => {

    db.beginTransaction((err) => {

        if (err) {
            return callback(err);
        }

        const currentYear = new Date().getFullYear();
        const financialYear = `${String(currentYear).slice(-2)}-${String(currentYear + 1).slice(-2)}`;

        const sequenceQuery = `
            SELECT last_number
            FROM po_sequence
            WHERE financial_year = ?
            FOR UPDATE
        `;

        db.query(sequenceQuery, [financialYear], (err, result) => {

            if (err) {
                return db.rollback(() => callback(err));
            }
            let ponumber
            let nextNumber;

            // Financial year doesn't exist
            if (result.length === 0) {

                nextNumber = 1;
                ponumber = `PO/${financialYear}/${String(nextNumber).padStart(4, "0")}`;

                const insertSequenceQuery = `
                    INSERT INTO po_sequence
                    (financial_year, last_number)
                    VALUES (?, ?)
                `;

                db.query(insertSequenceQuery, [financialYear, nextNumber], (err) => {

                    if (err) {
                        return db.rollback(() => callback(err));
                    }

                    savePurchase(nextNumber);
                });

            } else {

                nextNumber = result[0].last_number + 1;
                poNumber = `PO/${financialYear}/${String(nextNumber).padStart(4, "0")}`;

                const updateSequenceQuery = `
                    UPDATE po_sequence
                    SET last_number = ?
                    WHERE financial_year = ?
                `;

                db.query(updateSequenceQuery, [nextNumber, financialYear], (err) => {

                    if (err) {
                        return db.rollback(() => callback(err));
                    }

                    savePurchase(nextNumber);
                });

            }

            function savePurchase(nextNumber) {

                const ponumber = `PO/${financialYear}/${String(nextNumber).padStart(4, "0")}`;
                console.log("Generated PO Number: ", ponumber)

                const headerQuery = `
                    INSERT INTO trs_purchaseheader
                    (ponumber, podate, suppliername, contactperson, phone, paymentterms, remarks)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `;

                db.query(
                    headerQuery,
                    [
                        ponumber,
                        purchaseData.header.podate,
                        purchaseData.header.suppliername,
                        purchaseData.header.contactperson,
                        purchaseData.header.phone,
                        purchaseData.header.paymentterms,
                        purchaseData.header.remarks
                    ],
                    (err, headerResult) => {

                        if (err) {
                            return db.rollback(() => callback(err));
                        }

                        const purchaseId = headerResult.insertId;

                        if (purchaseData.detail.length === 0) {

                            return db.commit((err) => {

                                if (err) {
                                    return db.rollback(() => callback(err));
                                }

                                callback(null, {
                                    message: "Purchase Order Saved",
                                    purchaseId,
                                    ponumber
                                });

                            });

                        }

                        let completed = 0;

                        purchaseData.detail.forEach((element) => {

                            const detailQuery = `
                                INSERT INTO trs_purchasedetail
                                (purchaseheader_id, itemcode, itemname, gsm, quantity, unit, rate, amount)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                            `;

                            db.query(
                                detailQuery,
                                [
                                    purchaseId,
                                    element.itemcode,
                                    element.itemname,
                                    element.gsm,
                                    element.quantity,
                                    element.unit,
                                    element.rate,
                                    element.amount
                                ],
                                (err) => {

                                    if (err) {
                                        return db.rollback(() => callback(err));
                                    }

                                    completed++;

                                    if (completed === purchaseData.detail.length) {

                                        db.commit((err) => {

                                            if (err) {
                                                return db.rollback(() => callback(err));
                                            }

                                            callback(null, {
                                                message: "Purchase Order Saved",
                                                purchaseId,
                                                poNumber
                                            });

                                        });

                                    }

                                }
                            );

                        });

                    }
                );

            }

        });

    });

};

module.exports = {
    createPurchase
};