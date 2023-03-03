import React from "react";

function Footer() {
  return (
    <>
      <footer id="footer" class="footer fixed-bottom ">
        <div class="copyright">
          &copy; Copyright{" "}
          <strong>
            <span>Layraod School of Development</span>
          </strong>
          . All Rights Reserved
        </div>
        <div class="credits">
          <a href="#">Layroad School of Development</a>
        </div>
      </footer>

      <a
        href="#"
        class="back-to-top d-flex align-items-center justify-content-center"
      >
        <i class="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
}

export default Footer;
