import { useEffect, useState } from 'react';
import { Entertainer } from '../types/Entertainer';
import { useNavigate } from 'react-router-dom';
import {
  EntertainerWithBookingInfo,
  fetchEntertainers,
  fetchEntertainersWithBookingInfo,
} from '../api/EntertainersAPI';
import Pagination from './Pagination';
import { format } from 'date-fns';

function EntertainerList() {
  // {
  // selectedCategories,
  // }: {
  // selectedCategories: string[];
  // }
  // const [entertainers, setEntertainers] = useState<Entertainer[]>([]);
  const [entertainers, setEntertainers] = useState<
    EntertainerWithBookingInfo[]
  >([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEntertainersWithBookingInfo = async () => {
      try {
        setLoading(true);
        const data = await fetchEntertainersWithBookingInfo(pageSize, pageNum);
        setEntertainers(data.entertainers);
        setTotalPages(data.totalNumEntertainers); // Assuming the new endpoint returns total count
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadEntertainersWithBookingInfo();
  }, [pageSize, pageNum]);

  if (loading) return <p>Loading entertainers...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      {entertainers &&
        Array.isArray(entertainers) &&
        entertainers.map((e) => (
          <div key={e.entertainerID} id="projectCard" className="card">
            <h3>{e.entStageName}</h3>
            <div className="card-body">
              <p>Booked: {e.engagementCount} times</p>
              {e.startDate && (
                <p>
                  Last Booked: {format(new Date(e.startDate), 'MM/dd/yyyy')}
                </p>
              )}
              {!e.startDate && <p>Never Booked</p>}
              <button
                className="btn btn-success"
                onClick={() => navigate(`/${e.entertainerID}`)}
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      {/* <button onClick={() => navigate('/add-entertainer')} className="btn btn-primary mt-3">
        Add Entertainer
      </button> */}


      {/* <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      /> */}
    </>
  );
}
export default EntertainerList;
