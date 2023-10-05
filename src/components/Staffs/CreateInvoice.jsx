import { useEffect, useState } from "react";
import { GetAllProducts } from "../../services/Products/api";

const CreateInvoice = () => {
  const [iList, setiList] = useState([]);
  const [pList, setpList] = useState([]);
  const [sList, setsList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [total, setTotal] = useState(0.0);

  useEffect(() => {
    async function fetchData() {
      var res = await GetAllProducts();
      var tempList = await res.json();
      tempList.forEach((i) => (i.Quantity = 0));
      setpList(tempList);
    }
    fetchData();
  }, []);

  const handleChange = (value) => {
    setSearchValue(value);
    setsList(
      pList.filter((p) =>
        p.productName.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleOptionClick = (value) => {
    setSearchValue(value.productName);
    var tempList = iList;
    if (!tempList.find((i) => i.productId == value.productId))
      tempList.push(value);
    setsList([]);
    setiList([...tempList]);

    var total = 0;
    if (iList.length > 0)
      iList.forEach((i) => {
        let rate = i.price * i.Quantity;
        if (rate != 0) total += rate + i.tax - i.discount;
      });
    setTotal(total);
  };

  const handleQuantityChange = (value, rid) => {
    var tempList = iList;
    tempList.forEach((i) => {
      if (i.productId == rid) i.Quantity = value;
    });
    setiList([...tempList]);
    var total = 0;
    if (iList.length > 0)
      iList.forEach((i) => {
        let rate = i.price * i.Quantity;
        if (rate != 0) total += rate + i.tax - i.discount;
      });
    setTotal(total);
  };
  return (
    <div className="container mx-auto mt-4">
      <div className="relative inline-block text-left">
        <div className="flex justify-center items-center">
          <label className="block font-bold mr-2" htmlFor="search">
            Search
          </label>
          <input
            type="text"
            id="search"
            name="search"
            value={searchValue}
            onChange={(e) => handleChange(e.target.value)}
            className="w-1/2 px-4 py-2 border rounded-md"
          />
        </div>
        {sList.length > 0 && (
          <div className="origin-top-right absolute right-1 mt-2 w-1/2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            {sList.map((product) => (
              <div
                key={product.productId}
                onClick={() => handleOptionClick(product)}
                className="cursor-pointer hover:bg-gray-100 px-4 py-2"
              >
                {product.productName}
              </div>
            ))}
          </div>
        )}
      </div>

      <table className="min-w-full table-auto border border-collapse border-gray-200 mt-5">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Sl.No
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Product Name
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Price
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Tax
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Discount
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Quantity
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {iList.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 border border-gray-200">{index + 1}</td>
              <td className="px-4 py-2 border border-gray-200">
                {item.productName}
              </td>
              <td className="px-4 py-2 border border-gray-200">{item.price}</td>
              <td className="px-4 py-2 border border-gray-200">{item.tax}</td>
              <td className="px-4 py-2 border border-gray-200">
                {item.discount}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                <input
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                  type="number"
                  onChange={(e) => {
                    handleQuantityChange(e.target.value, item.productId);
                  }}
                  min={0}
                />
              </td>
              <td className="px-4 py-2 border border-gray-200">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded  ml-2"
                  onClick={() => {
                    setiList([
                      ...iList.filter((i) => i.productId !== item.productId),
                    ]);
                    var total = 0;
                    if (
                      iList.filter((i) => i.productId !== item.productId)
                        .length > 0
                    )
                      iList
                        .filter((i) => i.productId !== item.productId)
                        .forEach((i) => {
                          total += i.price * i.Quantity + i.tax - i.discount;
                        });
                    setTotal(total);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <input
          type="number"
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={total}
          readOnly
        />
        <button
          onClick={() => {
            var itemList = iList;
            let data = [];
            itemList.forEach((i) => {
              data.push({
                productId: i.productId,
                quantity: +i.Quantity,
                unitPrice: +i.price,
                tax: +i.tax,
                discount: +i.discount,
              });
            });
            console.log("Data", data);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded  ml-2"
        >
          Create Invoice
        </button>
      </div>
    </div>
  );
};
export default CreateInvoice;
