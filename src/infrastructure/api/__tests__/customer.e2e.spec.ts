import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
    
    beforeEach(async () => {
        await sequelize.sync({force: true});
    })

    afterAll(async () => {
        await sequelize.close();
    })

    it("should create a customer", async () => {
        const response = await request(app).post("/customer").send({
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 1,
                zip: "Zipcode 1",
                city: "City 1"
            }
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Customer 1");
        expect(response.body.address.street).toBe("Street 1");
        expect(response.body.address.number).toBe(1);
        expect(response.body.address.zip).toBe("Zipcode 1");
        expect(response.body.address.city).toBe("City 1");
    });

    it('should not create a customer', async () => {
        const response = await request(app).post("/customer").send({
            name: "Customer 1",
        });

        expect(response.status).toBe(500);
    });

    it('should list all customers', async () => {
        const response = await request(app).post("/customer").send({
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 1,
                zip: "Zipcode 1",
                city: "City 1"
            }
        });
        expect(response.status).toBe(200);

        const response2 = await request(app).post("/customer").send({
            name: "Customer 2",
            address: {
                street: "Street 2",
                number: 2,
                zip: "Zipcode 2",
                city: "City 2"
            }
        });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/customer").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        expect(listResponse.body.customers[0].name).toBe("Customer 1");
        expect(listResponse.body.customers[1].name).toBe("Customer 2");
        expect(listResponse.body.customers[0].address.street).toBe("Street 1");
        expect(listResponse.body.customers[1].address.street).toBe("Street 2");

        const listResponseXML = await request(app)
        .get("/customer")
        .set("Accept", "application/xml")
        .send();

        expect(listResponseXML.status).toBe(200);
        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listResponseXML.text).toContain(`<customers>`);
        expect(listResponseXML.text).toContain(`<customer>`);
        expect(listResponseXML.text).toContain(`<name>Customer 1</name>`);
        expect(listResponseXML.text).toContain(`<address>`);
        expect(listResponseXML.text).toContain(`<street>Street 1</street>`);
        expect(listResponseXML.text).toContain(`<number>1</number>`);
        expect(listResponseXML.text).toContain(`<zip>Zipcode 1</zip>`);
        expect(listResponseXML.text).toContain(`<city>City 1</city>`);
        expect(listResponseXML.text).toContain(`</address>`);
        expect(listResponseXML.text).toContain(`<address>`);
        expect(listResponseXML.text).toContain(`<street>Street 2</street>`);
        expect(listResponseXML.text).toContain(`<number>2</number>`);
        expect(listResponseXML.text).toContain(`<zip>Zipcode 2</zip>`);
        expect(listResponseXML.text).toContain(`<city>City 2</city>`);
        expect(listResponseXML.text).toContain(`</address>`);
        expect(listResponseXML.text).toContain(`</customer>`);
        expect(listResponseXML.text).toContain(`</customers>`);
    });
})