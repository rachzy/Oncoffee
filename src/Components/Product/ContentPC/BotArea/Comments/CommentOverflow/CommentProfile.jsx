import React from "react";

const CommentProfile = ({pfp, level}) => {
  return (
    <div className="coment_perfil">
      <div className="perfil_box">
        <div className="perfil_img">
          <img src={require(`../../../../../../imgs/${pfp}`)} alt="user-pfp" />
        </div>
        <div className="lvl">
          <h2>{level}</h2>
          <h3>Nível</h3>
        </div>
      </div>
    </div>
  );
};

export default CommentProfile;
