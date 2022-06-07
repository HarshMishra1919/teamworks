import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleFileChange = (e) => {
    // if user has previously selected anything
    setThumbnail(null);
    let selected = e.target.files[0]; // first file selected
    console.log(selected);

    if (!selected) {
      setThumbnailError("Please select a file!");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image!");
      return;
    }
    if (selected.size > 500000) {
      setThumbnailError("Image file size must be less than 500kb!");
      return;
    }
    setThumbnailError(null);
    setThumbnail(selected);
    console.log("Thumbnail updated");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  // console.log(isPending);

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          type="text"
          required
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>profile thumbnail: </span>
        <input required type="file" onChange={handleFileChange} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && (
        <button className="btn" disabled>
          Loading
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
