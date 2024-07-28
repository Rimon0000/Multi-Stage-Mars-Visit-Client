"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { FilePenLine, Star, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import moment from "moment";
import { TFormData, TUser, TUserId } from "@/types";
import Link from "next/link";

const Applicants = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        "http://localhost:5000/api/users"
      );
      const data = await res.json();
      setUsers(data.data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Button color="primary" isLoading>
        Loading
      </Button>
    );
  }


//handle delete
const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
          const response = await fetch(`http://localhost:5000/api/user/${id}`, {
            method: 'DELETE'
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const resultData = await response.json();
          console.log(resultData);
  
          if (resultData.data.deletedCount === 1) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
  
            const remaining = users.filter((user: TUserId) => user._id !== id);
            setUsers(remaining);
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the item.",
              icon: "error"
            });
          }
      }
    });
  };

  return (
    <div>
        <h1 className="text-center text-xl font-bold my-5">All Users Info</h1>
        <Table aria-label="Our all users">
          <TableHeader>
            <TableColumn>#</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>BIRTH DATE</TableColumn>
            <TableColumn>NATIONALITY</TableColumn>
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user: TUser, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-semibold">{user.name}</TableCell>
                  <TableCell className="font-semibold">
                    <p>{moment(new Date(`${user.birthOfDate}`)).format('DD MMMM YYYY')}</p>
                  </TableCell>
                  <TableCell className="font-semibold">{user.nationality}</TableCell>
                  <TableCell className="font-semibold">{user.email}</TableCell>
                  <TableCell className="text-right flex  justify-end">
                        <Button onClick={() => handleDelete(user?._id)} className=" hover:bg-slate-700 px-2 py-2 rounded-md">
                            <Trash2/>
                        </Button>
                          <hr className="border-2 mx-2 h-7 bg-slate-800"></hr>                    
                          <Link href={`applicants/${user?._id}`}>
                          <Button className=" hover:bg-slate-700 px-2 py-2 rounded-md">
                            <FilePenLine/>
                           </Button>
                          </Link>
                    </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No users available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
    </div>
    
  );
};

export default Applicants;
