import styled from "styled-components";

export const Wrapper = styled.div
    `
    display:flex ;
    justify-content: space-between ;
    flex-direction: column ;
    width:100%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;    height: 100% ;
    text-decoration:none;

    img {
        max-height: 250px;
        object-fit: cover;
    }

    div {
        font-family: Arial , Helvetica , sans-serif ;
        padding: 1rem ;
        height: 100% ;
    }


    ` ;