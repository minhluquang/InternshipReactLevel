import React from "react";

const Home = () => {
  return (
    <div>
      <b>Yêu cầu: </b>
      <br></br>
      <ul>
        <li>
          Sử dụng API từ trang web{" "}
          <a href="https://reqres.in/">https://reqres.in</a> để tạo website.
        </li>
        <li>
          Sử dụng framework Angular để tạo một màn hình website cơ bản bao gồm
          các chức năng:
          <ul className="list-unstyled">
            <li>1. Đăng nhập</li>
            <li>2. Thêm User</li>
            <li>3. Sửa User</li>
            <li>4. Xoá User</li>
            <li>5. Hiển thị tất cả các User</li>
            <li>6. Tìm kiếm User theo Id</li>
            <li>7. Sắp xếp theo FirstName</li>
            <li>8. Import User từ file .csv</li>
            <li>9. Export User ra file .csv</li>
          </ul>
        </li>
      </ul>
      <ul>
        <li>
          Tự do tùy chỉnh html, css, để có một website nhẹ nhàng, khoa học và
          đẹp.
        </li>
        <li>Commit và đẩy source code lên github public.</li>
        <li>
          Triển khai website lên{" "}
          <span className="text-decoration-underline">Heroku</span> để demo.
        </li>
      </ul>
      <b>Result</b>
      <ul>
        <li>Thời gian hoàn thành: 1-3 ngày </li>
        <li>Gửi link Heroku và Github link lại email này</li>
        <li>
          Thời gian phản hồi 2 ngày làm việc kể từ ngày nhận được bài thi.
        </li>
      </ul>
      <div>Yêu cầu backend (option):</div>
      <ul className="list-unstyled ms-4">
        <li>
          Sử dụng python django rest framework, tạo các api như trên trang web:{" "}
          <a href="https://reqres.in/">https://reqres.in/</a>
        </li>
      </ul>
    </div>
  );
};

export default Home;
