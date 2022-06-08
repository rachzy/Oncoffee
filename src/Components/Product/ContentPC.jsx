import React, { useState } from "react";

import "../../css/Product.css";

import Back from "./ContentPC/Back";
import BotArea from "./ContentPC/BotArea";
import TopComment from "./ContentPC/BotArea/Comments/TopComment";
import Comments from "./ContentPC/BotArea/Comments";
import MidArea from "./ContentPC/MidArea";
import MidGrid from "./ContentPC/MidArea/MidGrid";
import ProductDesc from "./ContentPC/MidArea/MidGrid/ProductDesc";
import MoreDetails from "./ContentPC/MidArea/MoreDetails";
import MoredBox from "./ContentPC/MidArea/MoreDetails/MoredBox";
import MoreImgs from "./ContentPC/MidArea/MoreImgs";
import MoreProducts from "./ContentPC/MidArea/MoreProducts";
import MoreCard from "./ContentPC/MidArea/MoreProducts/MoreCard";
import TopArea from "./ContentPC/TopArea";

import CardBox from "./ContentPC/TopArea/CardBox";
import CardBoxImg from "./ContentPC/TopArea/CardBox/CardBoxImg";
import CardBoxInfo from "./ContentPC/TopArea/CardBox/CardBoxInfo";
import CardBoxText from "./ContentPC/TopArea/CardBox/CardBoxText";
import StarsArea from "./ContentPC/BotArea/Comments/StarsArea";
import CommentOverflow from "./ContentPC/BotArea/Comments/CommentOverflow";
import CommentBox from "./ContentPC/BotArea/Comments/CommentOverflow/CommentBox";
import CommentProfile from "./ContentPC/BotArea/Comments/CommentOverflow/CommentProfile";
import CommentText from "./ContentPC/BotArea/Comments/CommentOverflow/CommentText";
import BackNext from "./ContentPC/BotArea/Comments/CommentOverflow/BackNext";

const ContentPC = () => {
  const randomId = () => {
    return Math.floor(Math.random() * 999999999 + 10000000);
  };

  //Product State
  const [product, setProduct] = useState({
    productId: randomId(),
    productTitle: "Café 3 corações",
    productBrand: "3Corações",
    productImage: "cafegourmet.png",
    productDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident odio sequi mollitia quo ipsa, cum corporis expedita eveniet cupiditate voluptates, recusandae ab itaque assumenda minima. Iure ratione cumque non aspernatur.",
    productRemainingAmount: 21,
    productPrice: {
      realPrice: 120,
      discount: 50,
      installments: 12,
      interestRate: 5,
      freight: 120,
    },
    productDetails: [
      {
        title: "Grãos",
        description: "Bla bla bla",
      },
      {
        title: "Sementes",
        description: "Bla bla bla",
      },
      {
        title: "Torradeiras",
        description: "Bla bla bla",
      },
      {
        title: "Alguma coisa",
        description: "Bla bla bla",
      },
      {
        title: "Coisa alguma",
        description: "Bla bla bla",
      },
    ],
    productImages: ["cafegourmet.png", "cafegourmet.png", "cafegourmet.png"],
    productRate: {
      oneStars: 100,
      twoStars: 350,
      threeStars: 175,
      fourStars: 394,
      fiveStars: 498,
    },
    productComments: [
      {
        id: randomId(),
        name: "Jorgin do Pneu",
        level: 4,
        title: "Produto da China",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae pariatur quisquam, modi debitis deleniti harum! Sequi doloribus possimus natus consequuntur optio labore dolore? Rem, tempore molestias minus odit voluptates nobis?",
        rateGiven: 4,
      },
    ],
  });

  //State that controls the amount of products that will be bought by the user
  const [amount, setAmount] = useState(1);
  return (
    <section className="conteudo_pc">
      <Back />

      {/* Top-Area */}
      <TopArea>
        <CardBox>
          <CardBoxText productBrand={product.productBrand} />
          <CardBoxImg productImg={product.productImage} />
        </CardBox>
        <CardBoxInfo
          productTitle={product.productTitle}
          productDescription={product.productDescription}
          productRate={product.productRate}
          productPrice={product.productPrice}
          amount={amount}
          setAmount={setAmount}
        />
      </TopArea>

      {/* Mid-Area */}
      <MidArea>
        <MoreProducts>
          <MoreCard />
          <MoreCard />
          <MoreCard />
        </MoreProducts>
        <MidGrid>
          <ProductDesc
            title="Exemplo"
            description="Nullam faucibus vestibulum sapien, at iaculis quam congue in. Cras vel ligula accumsan, placerat urna eu, luctus ipsum. Maecenas augue leo, egestas bibendum lectus sit amet, imperdiet imperdiet urna. Sed sit amet posuere erat. Suspendisse aliquam scelerisque arcu. Pellentesque eu ligula lobortis, maximus purus et, suscipit arcu. Donec elit libero, tristique eget rhoncus vel, placerat nec ante. Nullam blandit quam porttitor nibh bibendum imperdiet. Etiam ornare sem quis lacus malesuada, et molestie sem convallis. Fusce congue, purus sit amet malesuada elementum, elit ligula vulputate mi, a vulputate ligula leo ac eros. Etiam eleifend dui nec ullamcorper porttitor. Pellentesque nec quam posuere, bibendum augue posuere, sodales dui. Vestibulum elementum feugiat semper. Ut suscipit gravida dolor, sit amet fermentum sem laoreet vitae. Mauris dapibus dignissim rhoncus. Integer ligula odio, aliquam consectetur arcu nec, pretium pellentesque ipsum."
          />
          <MoreDetails>
            <MoredBox title="Grão" description="Exemplo de grão bla bla bla" />
            <MoredBox title="Grão" description="Exemplo de grão bla bla bla" />
            <MoredBox title="Grão" description="Exemplo de grão bla bla bla" />
            <MoredBox title="Grão" description="Exemplo de grão bla bla bla" />
            <MoredBox title="Grão" description="Exemplo de grão bla bla bla" />
          </MoreDetails>
          <MoreImgs>
            <img
              src={require(`../../imgs/cafegourmet.png`)}
              alt="cafe-gourmet"
            />
            <img
              src={require(`../../imgs/cafegourmet.png`)}
              alt="cafe-gourmet"
            />
            <img
              src={require(`../../imgs/cafegourmet.png`)}
              alt="cafe-gourmet"
            />
          </MoreImgs>
        </MidGrid>
      </MidArea>

      <BotArea>
        <Comments>
          <TopComment rate="4.8" />
          <StarsArea />
          <CommentOverflow>
            <CommentBox>
              <CommentProfile pfp="1629903043818.jpg" level="5" />
              <CommentText name="Exemplo" rate={3} />
            </CommentBox>
            <CommentBox>
              <CommentProfile pfp="1629903043818.jpg" level="5" />
              <CommentText name="Exemplo" rate={1.8} />
            </CommentBox>
            <CommentBox>
              <CommentProfile pfp="1629903043818.jpg" level="5" />
              <CommentText name="Exemplo" rate={2} />
            </CommentBox>
            <CommentBox>
              <CommentProfile pfp="1629903043818.jpg" level="5" />
              <CommentText name="Exemplo" rate={4.1} />
            </CommentBox>

            <BackNext currentPage={1} />
          </CommentOverflow>
        </Comments>
      </BotArea>
    </section>
  );
};

export default ContentPC;
