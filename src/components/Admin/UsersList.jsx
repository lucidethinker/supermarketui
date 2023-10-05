import { useEffect, useState } from "react";
import { GetAllUser } from "../../services/Users/api";

const UsersList = () => {
  const [uList, setuList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      var res = await GetAllUser();
      var data = await res.json();
      setuList(data);
    }
    fetchData();
  }, []);
  return (
    <div className="container mx-auto mt-4">     
      <table className="min-w-full table-auto border border-collapse border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Sl.No
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Full Name
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              UserName
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Email
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              User Type
            </th>
            <th className="px-4 py-2 bg-blue-300 border border-gray-200 text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {uList.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 border border-gray-200">{index + 1}</td>
              <td className="px-4 py-2 border border-gray-200">
                {item.fullName}
              </td>
              <td className="px-4 py-2 border border-gray-200">{item.userName}</td>
              <td className="px-4 py-2 border border-gray-200">
                {item.email}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                {item.userType > 0 ? "Staff": "Admin"}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                <button onClick={()=>{}} className="bg-yellow-500 text-white py-2 px-4 rounded-md">
                  Deactivate
                </button>
                <button onClick={()=>{}} className="bg-red-500 text-white px-4 py-2 rounded  ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
