"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[276],{7276:function(t,s,e){e.r(s),e.d(s,{ProfileContainer:function(){return M},default:function(){return z}});var r=e(1413),n=e(5671),o=e(3144),i=e(136),u=e(516),a=e(2791),p=e(8687),l=e(6070),c=e(6139),d=e(704),f="MyPosts_postsBlock__oOWrC",h="MyPosts_posts__ruEKx",m="Post_item__r7wXg",x=e(184),j=function(t){(0,i.Z)(e,t);var s=(0,u.Z)(e);function e(){return(0,n.Z)(this,e),s.apply(this,arguments)}return(0,o.Z)(e,[{key:"render",value:function(t){return(0,x.jsxs)("div",{className:m,children:[(0,x.jsx)("img",{alt:"#",src:"https://static.vecteezy.com/system/resources/thumbnails/002/002/332/small/ablack-man-avatar-character-isolated-icon-free-vector.jpg"}),this.props.message,(0,x.jsx)("div",{children:(0,x.jsxs)("span",{children:["Like ",this.props.likesCount]})})]})}}]),e}(a.Component),v=j,g=e(5304),P=e(2781),k=function(t){console.log("render");var s=t.posts.map((function(t){return(0,x.jsx)(v,{message:t.message,likesCount:t.likesCount},t.message+1)}));return(0,x.jsxs)("div",{className:f,children:[(0,x.jsx)("h3",{children:"My posts"}),(0,x.jsx)(Z,{onSubmit:function(s){t.addPost(s.newPostText)}}),(0,x.jsx)("div",{className:h,children:s})]})},S=(0,g.D)(10),Z=(0,d.Z)({form:"profileAddNewPostForm"})((function(t){return(0,x.jsxs)("form",{onSubmit:t.handleSubmit,children:[(0,x.jsx)("div",{children:(0,x.jsx)(c.Z,{name:"newPostText",component:P.gx,placeholder:"Post message",validate:[g.C,S]})}),(0,x.jsx)("div",{children:(0,x.jsx)("button",{children:"Add post"})})]})})),_=a.memo(k),y=(0,p.$j)((function(t){return{posts:t.profilePage.posts,newPostText:t.profilePage.newPostText}}),{addPost:l.q2})(_),C="ProfileInfo_descriptiomBlock__N8yD-",b=e(2733),w=e(9439),N=function(t){var s=(0,a.useState)(!1),e=(0,w.Z)(s,2),r=e[0],n=e[1],o=(0,a.useState)(t.status),i=(0,w.Z)(o,2),u=i[0],p=i[1];(0,a.useEffect)((function(){p(t.status)}),[t.status]);return(0,x.jsxs)("div",{children:[!r&&(0,x.jsx)("div",{children:(0,x.jsx)("span",{onClick:function(){n(!0)},children:t.status||"This Profile hasn`t status"})}),r&&(0,x.jsx)("div",{children:(0,x.jsx)("input",{onChange:function(t){p(t.currentTarget.value)},autoFocus:!0,onBlur:function(){n(!1),t.updateStatus(u)},value:u})})]})},T=function(t){return t.profile?(0,x.jsx)("div",{children:(0,x.jsxs)("div",{className:C,children:[(0,x.jsx)("img",{alt:"#",src:t.profile.photos.large}),(0,x.jsx)(N,{status:t.status,updateStatus:t.updateStatus})]})}):(0,x.jsx)(b.Z,{})},I=function(t){return(0,x.jsxs)("div",{children:[(0,x.jsx)(T,{profile:t.profile,status:t.status,updateStatus:t.updateStatus}),(0,x.jsx)(y,{})]})},U=e(7781),A=e(5628),M=function(t){(0,i.Z)(e,t);var s=(0,u.Z)(e);function e(){return(0,n.Z)(this,e),s.apply(this,arguments)}return(0,o.Z)(e,[{key:"componentDidMount",value:function(){var t=this.props.router.params.userId;t||(t=this.props.authorizedUserId)||(t=28375)||this.props.router.navigate("/login"),this.props.getUserProfile(t),this.props.getStatus(t)}},{key:"render",value:function(){return(0,x.jsx)(I,(0,r.Z)((0,r.Z)({},this.props),{},{profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus}))}}]),e}(a.Component),z=(0,U.qC)((0,p.$j)((function(t){return{profile:t.profilePage.profile,status:t.profilePage.status,authorizedUserId:t.auth.userId,isAuth:t.auth.isAuth}}),{setUserProfile:l.$l,getUserProfile:l.et,getStatus:l.lR,updateStatus:l.Nf}),A.E)(M)}}]);
//# sourceMappingURL=276.6936b115.chunk.js.map