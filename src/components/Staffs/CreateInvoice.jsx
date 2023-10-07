import { useEffect, useState } from "react";
import { GetAllProducts } from "../../services/Products/api";
import Cookies from "js-cookie";
import { AddOrder, GetInvNo } from "../../services/Orders/api";
import { useNavigate } from "react-router-dom";

const CreateInvoice = () => {
  const [iList, setiList] = useState([]);
  const [pList, setpList] = useState([]);
  const [sList, setsList] = useState([]);
  const [InvNo, setInvNo] = useState(0);
  const [fData, setfData] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [total, setTotal] = useState(0.0);
  const [grossAmount, setG] = useState(0.0);
  const [taxAmount, setT] = useState(0.0);
  const [discountAmount, setD] = useState(0.0);
  const [cI, setCI] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      // let t = await GetInvNo();
      // setInvNo(await t.json());
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
              Tax%
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Discount%
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Stock
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
                {item.stockQuantity}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                <input
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                  type="number"
                  onChange={(e) => {
                    if (e.target.value <= item.stockQuantity) {
                      handleQuantityChange(e.target.value, item.productId);
                    } else {
                      e.target.value = item.stockQuantity;
                    }
                  }}
                  min={0}
                  max={item.stockQuantity}
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
      <div className="flex items-center justify-between mt-4">
        <div className="font-semibold">Net Total:</div>
        <input
          type="number"
          className="w-1/2 p-2 bg-gray-100 border-none rounded-md focus:outline-none"
          value={total}
          readOnly
        />
        <button
          onClick={() => {
            var itemList = iList;
            let data = [];
            let g = 0;
            let t = 0;
            let d = 0;
            itemList.forEach((i) => {
              g += i.Quantity * i.price;
              t += i.tax;
              d += i.discount;
              data.push({
                productId: i.productId,
                quantity: +i.Quantity,
                unitPrice: +i.price,
                tax: +i.tax,
                discount: +i.discount,
              });
            });
            setD(d);
            setG(g);
            setT(t);
            setfData({
              userId: +Cookies.get("userId"),
              grossAmount: g,
              taxAmount: t,
              discountAmount: d,
              totalAmount: total,
              status: 1,
              orderItems: data,
            });
            setCI(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-700 focus:outline-none"
        >
          Invoice
        </button>
      </div>
      {cI && (
        <div className="max-w max-h mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-4">
          <div className="md:flex">
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                INVOICE
              </div>
              <a
                href="#"
                className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
              >
                {"INV" + InvNo}
              </a>
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
                  </tr>
                </thead>
                <tbody>
                  {iList.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border border-gray-200">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2 border border-gray-200">
                        {item.productName}
                      </td>
                      <td className="px-4 py-2 border border-gray-200">
                        {item.price}
                      </td>
                      <td className="px-4 py-2 border border-gray-200">
                        {item.tax}
                      </td>
                      <td className="px-4 py-2 border border-gray-200">
                        {item.discount}
                      </td>
                      <td className="px-4 py-2 border border-gray-200">
                        {item.Quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="px-6 py-4">
            <span className="inline-block font-bold px-3 py-1 text-sm text-gray-700 mr-2">
              Gross Amount : {grossAmount}
            </span>
            <span className="inline-block font-bold px-3 py-1 text-sm text-gray-700 mr-2">
              Total Tax : {taxAmount}
            </span>
            <span className="inline-block font-bold px-3 py-1 text-sm text-gray-700">
              Total Discount : {discountAmount}
            </span>
            <span className="inline-block font-bold px-3 py-1 text-sm text-gray-700">
              Net Amount : {total}
            </span>
            <div className="flex items-center mt-4">
              <button
                onClick={async () => {
                  let confrm = confirm("Proceed to Bill?");
                  if (confrm) {
                    let res = await AddOrder(fData);
                    let data = await res.json();
                    if (data.orderId > 0) {
                      alert("Billed Successfully!!");
                      navigate("/Orders");
                    } else alert("Billing Failed!!");
                  } else return;
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-700 focus:outline-none"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CreateInvoice;
