import React from 'react';
import Container from '../Container';

const Footer = () => {
  return (
    <div className="bg-base-200 mt-16 ">
      <Container>
        <footer className="footer sm:flex justify-between py-10 px-2">
          <nav>
            <h6 className="text-secondary text-base">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <h6 className="text-secondary text-base">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
          <nav>
            <h6 className="text-secondary text-base">Social</h6>
            <a className="link link-hover">Twitter</a>
            <a className="link link-hover">Instagram</a>
            <a className="link link-hover">Facebook</a>
          </nav>

          <nav>
            <h6 className="text-secondary text-base">Apps</h6>
            <a className="link link-hover">Mac</a>
            <a className="link link-hover">Windows</a>
            <a className="link link-hover">iPhone</a>
            <a className="link link-hover">Android</a>
          </nav>
        </footer>
        <p className="text-center pb-5 text-white/50">Copyright © {new Date().getFullYear()} - All right reserved</p>
      </Container>
    </div>
  );
};

export default Footer;