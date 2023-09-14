import { Link, Outlet } from 'react-router-dom';
import'./Wrapper.css';

export default function Wrapper() {
  return (
    <>
      <header>
        <link rel="stylesheet" href="main.css"/>
        <Link to="/student">View all students</Link>
        <Link class="new" to="/student/new">Add New Students</Link>
      </header>

      <Outlet />
    </>
  );
}