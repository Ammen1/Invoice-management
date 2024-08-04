// "use client";

// import { ColumnDef } from "@tanstack/react-table";
// import Image from "next/image";
// import { formatDateTime } from "@/lib/utils";
// import { Invoice } from "@/types/invoice.types";  

// export const columns: ColumnDef<Invoice>[] = [
//   {
//     header: "Logo",
//     accessorKey: "companyLogoUrl",
//     cell: ({ row }) => {
//       const invoice = row.original;
//       return (
//         <div className="flex items-center">
//           <Image
//             src={invoice.companyLogoUrl}
//             alt="company logo"
//             width={50}
//             height={50}
//           />
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "issuerCompanyName",
//     header: "Issuer Company",
//     cell: ({ row }) => {
//       const invoice = row.original;
//       return <p className="text-14-medium ">{invoice.issuerCompanyName}</p>;
//     },
//   },
//   {
//     accessorKey: "issuerAddress",
//     header: "Issuer Address",
//     cell: ({ row }) => {
//       const invoice = row.original;
//       return <p className="text-14-medium ">{invoice.issuerAddress}</p>;
//     },
//   },
//   {
//     accessorKey: "issuerCity",
//     header: "Issuer City",
//     cell: ({ row }) => {
//       const invoice = row.original;
//       return <p className="text-14-medium ">{invoice.issuerCity}</p>;
//     },
//   },
//   {
//     accessorKey: "issuerCountry",
//     header: "Issuer Country",
//     cell: ({ row }) => {
//       const invoice = row.original;
//       return <p className="text-14-medium ">{invoice.issuerCountry}</p>;
//     },
//   },
//   {
//     accessorKey: "issuerContactName",
//     header: "Issuer Contact",
//     cell: ({ row }) => {
//       const invoice = row.original;
//       return <p className="text-14-medium ">{invoice.issuerContactName}</p>;
//     },
//   },
//   {
//     accessorKey: "clientCompanyName",
//     header: "Client Company",
//     cell: ({ row }) => {
//       const invoice = row.original;
//       return <p className="text-14-medium ">{invoice.clientCompanyName}</p>;
//     },
//   },
//   {
//     accessorKey: "clientAddress",
//     header: "Client Address",
//     cell: ({ row }) => {
//       const invoice = row.original;
//       return <p className="text-14-medium ">{invoice.clientAddress}</p>;
//     },
//   },
//   {
//     accessorKey: "clientCity",
//     header: "Client City",
//     cell: ({ row }) => {
//       const invoice = row.original;
//       return <p className="text-14-medium ">{invoice.clientCity}</p>;
//     },
//   },
//   {
//     accessorKey: "clientCountry",
//     header: "Client Country",
//     cell: ({ row }) => {
//       const invoice = row.original;
//       return <p className="text-14-medium ">{invoice.clientCountry}</p>;
//     },
//   },
//   {
//     accessorKey: "invoiceNumber",
//     header: "Invoice Number",
//     cell: ({ row }) => {
//       const invoice = row.original;
//       return <p className="text-14-medium ">{invoice.invoiceNumber}</p>;
//     },
//   },
//   {
//     accessorKey: "issueDate",
//     header: "Issue Date",
//     cell: ({ row }) => {
//       const invoice = row.original;
//       return (
//         <p className="text-14-regular min-w-[100px]">
//           {formatDateTime(invoice.issueDate).date}
//         </p>
//       );
//     },
//   },
//   {
//     accessorKey: "dueDate",
//     header: "Due Date",
//     cell: ({ row }) => {
//       const invoice = row.original;
//       return (
//         <p className="text-14-regular min-w-[100px]">
//           {formatDateTime(invoice.dueDate).date}
//         </p>
//       );
//     },
//   },
//   {
//     accessorKey: "items",
//     header: "Items",
//     cell: ({ row }) => {
//       const invoice = row.original;
//       return (
//         <ul className="list-disc list-inside">
//           {invoice.items.map((item, index) => (
//             <li key={index}>
//               {item.description} - {item.quantity} x {item.price} = {item.totalAmount}
//             </li>
//           ))}
//         </ul>
//       );
//     },
//   },
// ];
