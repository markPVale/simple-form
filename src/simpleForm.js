import React, { useState } from "react";

const SimpleFormComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mockResponse = {
    status: 200,
    text: async () => "Mock: Form submitted successfully",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const form = event.target;
    try {
      const formData = {
        name,
        email,
        message,
      };
      // const formData = new FormData(form);

      // formData.append("name", form.name.value);
      // formData.append("email", form.email.value);
      // formData.append("message", form.message.value);

      const response =
        process.env.NODE_ENV === "development"
          ? mockResponse
          : await fetch("/upload", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: formData.get("name"),
                email: formData.get("email"),
                message: formData.get("message"),
              }),
            });
      const text = await response.text();
      alert(text);
    } catch (_) {
      alert("An error occurred while submitting the form");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Message:
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SimpleFormComponent;
