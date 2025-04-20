import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Entertainer } from '../types/Entertainer';
import { fetchEntertainers } from '../api/EntertainersAPI'; // Import the base Entertainer type and fetchEntertainers

function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null); // Use the base Entertainer type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEntertainerDetails = async () => {
      if (id) {
        try {
          setLoading(true);
          const data = await fetchEntertainers(1, 1000); // Adjust pageSize as needed
          const foundEntertainer = data.entertainers.find(
            (e) => e.entertainerID === parseInt(id, 10)
          );
          setEntertainer(foundEntertainer || null); // Assign foundEntertainer if it exists, otherwise assign null
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      }
    };

    loadEntertainerDetails();
  }, [id]);

  const handleDelete = async (entertainerId: number | undefined) => {
    // ... (delete functionality remains the same) ...
  };

  if (loading) {
    return <p>Loading entertainer details...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error loading details: {error}</p>;
  }

  if (!entertainer) {
    return <p>Entertainer not found.</p>;
  }

  return (
    <div>
      <h2>Details for {entertainer.entStageName}</h2>
      <ul className="list-unstyled">
        <li>
          <strong>SSN:</strong> {entertainer.entSSN}
        </li>
        <li>
          <strong>Address:</strong> {entertainer.entStreetAddress},{' '}
          {entertainer.entCity}, {entertainer.entState} {entertainer.entZipCode}
        </li>
        <li>
          <strong>Phone Number:</strong> {entertainer.entPhoneNumber}
        </li>
        {entertainer.entWebPage && (
          <li>
            <strong>Web Page:</strong>{' '}
            <a
              href={entertainer.entWebPage}
              target="_blank"
              rel="noopener noreferrer"
            >
              {entertainer.entWebPage}
            </a>
          </li>
        )}
        <li>
          <strong>Email:</strong> {entertainer.entEMailAddress}
        </li>
        <li>
          <strong>Date Entered:</strong>{' '}
          {format(new Date(entertainer.dateEntered), 'MM/dd/yyyy')}
        </li>
        {/* Booking information will not be available with this approach */}
      </ul>
      {/* <Link to="/entertainers" className="btn btn-secondary me-2">Back to List</Link> */}
      {/* <Link to={`/entertainers/edit/${entertainer.entertainerID}`} className="btn btn-primary me-2">Edit Entertainer</Link> */}
      {/* <button
        onClick={() => handleDelete(entertainer.entertainerID)}
        className="btn btn-danger"
      >
        Delete Entertainer
      </button> */}
    </div>
  );
}

export default DetailPage;
