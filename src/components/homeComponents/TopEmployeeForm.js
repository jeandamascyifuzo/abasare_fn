import React from "react";
import groupBy from "lodash/groupBy";
import sumBy from "lodash/sumBy";

const TopEmployeeForm = ({ salesData }) => {
  const employees = [];
  salesData.forEach((element) => {
    if (element.provider !== "") {
      employees.push({
        id: element._id,
        amount: element.totalbt2,
        employee: element.provider,
      });
    }
  });

  const groups = groupBy(employees, (entry) => {
    return entry.employee;
  });

  const topEmployees = Object.entries(groups).map((entry) => {
    const [key, values] = entry;

    return {
      name: key,
      total: sumBy(values, "amount"),
    };
  });
  const sorttedData = topEmployees.sort((a, b) => b.total - a.total);

  return (
    <div className="col-xl-6 col-xxl-6 col-lg-12 col-md-12">
      <div id="user-activity" className="card">
        <div className="card-header border-0 pb-0 d-sm-flex d-block">
          <div>
            <h4 className="card-title mb-1">Top Employees</h4>
            {/* <small className="mb-0">
              Lorem Ipsum is simply dummy text of the printing
            </small> */}
          </div>
        </div>
        <div className="card-body">
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="user"
              role="tabpanel"
            >
              <table className="table table-responsive-md">
                <thead>
                  <tr>
                    <th className="w-[80px]">
                      <strong>#</strong>
                    </th>
                    <th>
                      <strong>NAME</strong>
                    </th>
                    <th>
                      <strong>GENERATED</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sorttedData.slice(0,10).map((item, index) => (
                    <tr key={index}>
                      <td>
                        <strong>{index + 1}</strong>
                      </td>
                      <td>{item.name}</td>
                      <td>{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopEmployeeForm;
