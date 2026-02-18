import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import Container from "../../../../components/shared/Container";
import Loading from "../../../../components/shared/loading/Loading";
import useAuth from "../../../../hooks/useAuth";
import useUpdateUserRole from "../../../../hooks/useUpdateUserRole";

const AllUsers = () => {
  const { user } = useAuth();
  // console.log(user)
  const { updateRole } = useUpdateUserRole();

// load all users
  const { data: allUsers = [], isLoading } = useQuery({
    queryKey: ["users", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_api_url}/users`, {
        params: { email: user.email },
      });
      return res.data;
    },
  });
  // console.log(allUsers);

  // change user role
  const handleRoleChange = (id, role) => {
    console.log(id, role);
    Swal.fire({
      title: "Are you sure?",
      text: `Make this user "${role}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#234c6a",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRole({ id, role });
      }
    });
  };

  if (isLoading) return <Loading></Loading>;
  return (
    <Container>
      <div className="max-w-5xl mx-auto my-10">
        <title>All users</title>
        <div className="mb-10">
          <h1 className="heading_title">All Users Management </h1>
          <p className="heading_subtitle">
            View and manage all registered users. Monitor roles, account
            details, and user activity from one place.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((allUser, idx) => (
                <tr key={allUser._id}>
                  <th>{idx + 1}</th>
                  <td>{allUser.name}</td>
                  <td>{allUser.email}</td>
                  <td>{allUser.role}</td>
                  {/* control user role */}
                  <td className="flex gap-2 items-center">
                    {/* {allUser.role === "user" ? (
                      <>
                        <button className="btn btn-sm ">Make Admin</button>
                        <button className="btn btn-sm btn-secondary">
                          Make Librarian
                        </button>
                      </>
                    ) : (
                      <button className="btn btn-sm btn-error">
                        Make User
                      </button>
                    )} */}
                    {allUser.role !== "admin" && (
                      <button
                        onClick={() => handleRoleChange(allUser._id, "admin")}
                        type="button"
                        className="btn btn-sm text-white/80"
                      >
                        Make Admin
                      </button>
                    )}

                    {allUser.role !== "librarian" && (
                      <button
                        onClick={() =>
                          handleRoleChange(allUser._id, "librarian")
                        }
                        type="button"
                        className="btn btn-sm btn-secondary"
                      >
                        Make Librarian
                      </button>
                    )}

                    {allUser.role !== "user" && (
                      <button
                        onClick={() => handleRoleChange(allUser._id, "user")}
                        type="button"
                        className="btn btn-sm btn-error"
                      >
                        Make User
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default AllUsers;
