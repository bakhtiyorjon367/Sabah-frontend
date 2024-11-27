import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Margin, Sanitizer } from "@mui/icons-material";

const Footers = styled.div`
  width: 100%;
  height: 560px;
  display: flex;
  background: black;
  background-size: cover;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <Stack flexDirection={"row"} sx={{ mt: "64px" }}>
          <Stack flexDirection={"column"} style={{ width: "340px" }}>
            <Box className={"home-title"}>
              <h1 style={{ color: "#fff", fontSize: "24px", fontFamily:"Poppins"}}>Sabah</h1>
            </Box>
            <Box className={"foot-desc-txt"}>
              We believe that beauty thrives in diversity and discovery.
              Our purpose is to expand the way the world sees beauty by empowering the extraordinary in each of us.
            </Box>
            <Box className="sns-context">
              <img src={"/icons/facebook.svg"} />
              <img src={"/icons/twitter.svg"} />
              <img src={"/icons/instagram.svg"} />
              <img src={"/icons/youtube.svg"} />
            </Box>
          </Stack>
          <Stack sx={{ ml: "288px" }} flexDirection={"row"}>
            <Stack>
              <Box>
                <Box className={"foot-category-title"}>Categories</Box>
                <Box className={"foot-category-link"}>
                  <Link to="/">Home</Link>
                  <Link to="/products">Products</Link>
                  {authMember && <Link to="/orders">Orders</Link>}
                  <Link to="/help">Help</Link>
                </Box>
              </Box>
            </Stack>
            <Stack sx={{ ml: "100px" }}>
              <Box>
                <Box className={"foot-category-title"}>Find us</Box>
                <Box
                  flexDirection={"column"}
                  sx={{ mt: "20px" }}
                  className={"foot-category-link"}
                  justifyContent={"space-between"}
                >
                  <Box flexDirection={"row"} className={"find-us"}>
                    <span>L.</span>
                    <div>Downtown, Dubai</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>P.</span>
                    <div>+971 4 554 7777</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>E.</span>
                    <div>sabah@gmail.com</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>C.</span>
                    <div>Contact 24 hours</div>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          style={{ border: "1px solid #C5C8C9", width: "100%", opacity: "0.2" }}
          sx={{ mt: "80px" }}
        ></Stack>
        <Stack className={"copyright-txt"}>
          © Copyright Devex Global, All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
