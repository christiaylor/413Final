import { useEffect, useState } from 'react';
import { Entertainer } from '../types/Entertainer';
import { deleteEntertainer, fetchEntertainers } from '../api/EntertainersAPI';
import Pagination from '../components/Pagination';
import NewProjectForm from '../components/NewProjectForm';
import EditProjectForm from '../components/EditProjectForm';

const AdminEntertainersPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Entertainer[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Entertainer | null>(
    null
  );

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchEntertainers(pageSize, pageNum, []);
        setProjects(data.entertainers);
        setTotalPages(Math.ceil(data.totalNumEntertainers / pageSize));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [pageSize, pageNum]);

  const handleDelete = async (projectId: number) => {
    const confirmDelete = window.confirm('You sure you wanna delete that?');
    if (!confirmDelete) return;
    try {
      await deleteEntertainer(projectId);
      setProjects(projects.filter((p) => p.projectId !== projectId));
    } catch (error) {
      alert('Failed to delete project. Please try again.');
    }
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  return (
    <div>
      <h1>Admin - Projects</h1>

      {!showForm && (
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowForm(true)}
        >
          Add Project
        </button>
      )}

      {showForm && (
        <NewProjectForm
          onSuccess={() => {
            setShowForm(false);
            fetchEntertainers(pageSize, pageNum, []).then((data) =>
              setProjects(data.entertainers)
            );
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingProject && (
        <EditProjectForm
          project={editingProject}
          onSuccess={() => {
            setEditingProject(null);
            fetchEntertainers(pageSize, pageNum, []).then((data) =>
              setProjects(data.entertainers)
            );
          }}
          onCancel={() => setEditingProject(null)}
        />
      )}
      {/* <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Stage Name</th>
            <th>SSN</th>
            <th>Street Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Phone Number</th>
            <th>Web Page</th>
            <th>Email</th>
            <th>Date Entered</th>
            <th>Zip</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((e) => (
            <tr key={e.entertainerID}>
              <td>{e.entStageName}</td>
              <td>{e.entSSN}</td>
              <td>{e.entStreetAddress}</td>
              <td>{e.entCity}</td>
              <td>{e.entState}</td>
              <td>{e.entZipCode}</td>
              <td>{e.entPhoneNumber}</td>
              <td>{e.entWebPage}</td>
              <td>{e.entEMailAddress}</td>
              <td>{e.dateEntered}</td>

              <td>
                <button
                  className="btn btn-primary btn-sm w-100 mb-1"
                  onClick={() => setEditingProject(e)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm w-100 mb-1"
                  onClick={() => handleDelete(e.entertainerID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      {entertainers.map((e) => (
      <div key={e.entertainerID} id="projectCard" className="card">
          <h3>{e.entStageName}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>SSN: </strong>
                {e.entSSN}
              </li>
              <li>
                <strong>Address: </strong>
                {e.entStreetAddress}
              </li>
              <li>
                <strong>City: </strong>
                {e.entCity}
              </li>
              <li>
                <strong>State </strong>
                {e.entState}
              </li>
              <li>
                <strong>Zip: </strong>
                {e.entZipCode}
              </li>
              <li>
                <strong>Phone Number: </strong>
                {e.entPhoneNumber}
              </li>{' '}
              <li>
                <strong>Web Page: </strong>
                {e.entWebPage}
              </li>{' '}
              <li>
                <strong>Email: </strong>
                {e.entEMailAddress}
              </li>
              <li>
                <strong>Date Entered: </strong>
                {e.dateEntered}
              </li>
            </ul>
          </div>
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
    </div>
  );
  
};
</div>

export default AdminEntertainersPage;
