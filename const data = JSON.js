const data = JSON.stringify({
  "issuerCompanyName": "Tech Solutions Inc.",
  "issuerContactName": "Alice Johnson",
  "issuerAddress": "123 Tech Lane",
  "issuerCity": "Tech City",
  "issuerCountry": "Techland",
  "clientCompanyName": "Client Corp.",
  "clientAddress": "456 Client Blvd",
  "clientCity": "Client Town",
  "clientCountry": "Clientland",
  "invoiceNumber": "INV-123458",
  "issueDate": "2024-07-31T00:00:00.000Z",
  "dueDate": "2024-08-15T00:00:00.000Z",
  "companyLogoUrl": "http://example.com/logo.png",
  "status": "PENDING",
  "lineItems": [
    {
      "description": "Consulting Services",
      "quantity": 5,
      "unitPrice": 100,
      "taxAmount": 50,
      "totalAmount": 550
    },
    {
      "description": "Software License",
      "quantity": 1,
      "unitPrice": 200,
      "taxAmount": 40,
      "totalAmount": 240
    }
  ]
});

xhr.open("POST", "http://localhost:4000/invoices");
xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYUBhLmNvbSIsImlhdCI6MTcyMjQ3NTUzMCwiZXhwIjoxNzIyNDc5MTMwfQ.qNj43wRfRSPxt6C8-nzXlqnGaiNdCcE8Xtn0bV2D6sk");

