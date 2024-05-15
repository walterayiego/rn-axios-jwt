import { useState } from "react";
import axios from "axios";
const url = "https://localhost:4000/login";

const PostRequest = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const post = await axios.post(url, {
        username: name,
      });
      console.log(`Success : AccessToken: ${post.data?.accessToken}`);
    } catch (error) {
      console.error(error);
    }
    console.log(name, email);
  };

  return (
    <div className="w-[50vw] h-[30vh] flex flex-col items-center justify-center border border-white gap-5">
      <h2 className="text-center">post request</h2>
      <form
        className="form flex-1 justify-between flex flex-col"
        onSubmit={handleSubmit}
      >
        <div className="form-row">
          <label htmlFor="name" className="form-label mx-2">
            Name
          </label>
          <input
            type="text"
            className="form-input"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="email" className="form-label mx-2">
            Email
          </label>
          <input
            type="email"
            className="form-input"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-block">
          Login
        </button>
      </form>
    </div>
  );
};
export default PostRequest;
