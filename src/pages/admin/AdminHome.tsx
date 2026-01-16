import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <div>
      <h1>Admin</h1>
      <ul>
        <li>
          <Link to="/admin/profile">개인정보 입력</Link>
        </li>
        <li>
          <Link to="/admin/projects">프로젝트 이력 입력</Link>
        </li>
      </ul>
    </div>
  );
}
