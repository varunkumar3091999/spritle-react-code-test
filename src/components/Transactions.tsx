import { useEffect, useState, FC } from "react";
import ReactPaginate from "react-paginate";

const Transactions: FC<Props> = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currPageTxns, setCurrPageTxns] = useState<Transaction[]>([]);

  const perPage: number = 10;

  useEffect(() => {
    if (transactions.length > 10) {
      setCurrPageTxns([...transactions].splice(currentPage * 10, perPage));
    } else {
      setCurrPageTxns([...transactions]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);

  const formatTime = (time: Date, prefix: string = "") => {
    return typeof time == "object" ? prefix + time.toLocaleString() : "";
  };

  const pageChange = (selected: number) => {
    const tempTransactions: Transaction[] = [...transactions];
    setCurrentPage(selected);
    setCurrPageTxns(tempTransactions.splice(selected * 10, perPage));
  };
  return (
    <div className=" flex-col content-center justify-between ">
      <div className="h-10/12">
        <table className="mx-auto border p-2 mx h-10/12">
          <thead className="border mt-20 ">
            <tr>
              <th className="w-2/5 border">Time</th>
              <th className="w-1/5 border">Amount</th>
              <th className="w-1/5 border">Cumulative Balance</th>
              <th className="w-1/5 border">Action</th>
            </tr>
          </thead>
          {currPageTxns.map((tran, i) => (
            <tr key={i}>
              <td className="text-center border p-2">
                {formatTime(tran.time)}
              </td>
              <td className="text-center border">{tran.amount}</td>
              <td className="text-center border">{tran.balance}</td>

              <td
                className={`text-center border ${
                  tran.action === "add" ? "bg-green-200" : "bg-red-200"
                }`}
              >
                {tran.action}
              </td>
            </tr>
          ))}
        </table>
      </div>
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={Math.ceil(transactions.length / perPage)}
        onPageChange={({ selected }: { selected: number }) =>
          pageChange(selected)
        }
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        containerClassName={"pagination w-1/2"}
        activeClassName={"active"}
      />
    </div>
  );
};

interface Transaction {
  time: Date;
  amount: number;
  action: string;
  balance: number;
}
interface Props {
  transactions: Transaction[];
}

export default Transactions;
