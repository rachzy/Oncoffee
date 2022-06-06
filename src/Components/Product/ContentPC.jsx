import React from "react";

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
import Footer from "../PageComponents/Footer";

const ContentPC = () => {
  return (
    <section className="conteudo_pc">
      <Back />

      {/* Top-Area */}
      <TopArea>
        <CardBox>
          <CardBoxText />
          <CardBoxImg />
        </CardBox>
        <CardBoxInfo />
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
              <CommentText name="Exemplo" rate={5} />
            </CommentBox>
            <CommentBox>
              <CommentProfile pfp="1629903043818.jpg" level="5" />
              <CommentText name="Exemplo" rate={5} />
            </CommentBox>
            <CommentBox>
              <CommentProfile pfp="1629903043818.jpg" level="5" />
              <CommentText name="Exemplo" rate={5} />
            </CommentBox>
            <CommentBox>
              <CommentProfile pfp="1629903043818.jpg" level="5" />
              <CommentText name="Exemplo" rate={5} />
            </CommentBox>

            <BackNext currentPage={1} />
          </CommentOverflow>
        </Comments>
      </BotArea>
    </section>
  );
};

export default ContentPC;
