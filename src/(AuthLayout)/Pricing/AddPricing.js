import { Button, Input, message } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { POST_API } from "../components/API/PostAPI";
import { handleKeyPress } from "../components/Helper/ValidateInputNumber";

const AddPricing = ({ getPricing, handleCancel }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", status: "" });
  const { name, markup } = formData;

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    const mutation = `
      mutation {
        create_a_pricing_markups(
            name: "${name}"
            markup: ${markup}
        )  {
          id
          name
          markup
        }
      }
    `;

    const path = "";
    try {
      const res = await POST_API(
        path,
        JSON.stringify({ query: mutation }),
        headers
      );
      console.log(res);
      if (res) {
        message.success("Pricing has been Added Successfully");
        getPricing();
        handleCancel();
        setFormData({});
      }
    } catch (error) {
      message.error("Failed to Add Pricing, Please check and try again");
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full h-full p-4">
      <h1 className="title capitalize">add Pricing</h1>
      <label className="labelStyle mt-4">Pricing Name</label>
      <Input
        name="name"
        value={name}
        onChange={onChange}
        placeholder="type Pricing name here"
        className="w-full border-black"
      />
      <label className="labelStyle mt-3">markup</label>
      <Input
        max={100}
        min={0.5}
        step={0.1}
        name="markup"
        value={markup}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        className="border-black w-full"
      />
      <Button htmlType="submit" className="m-5 list-btn float-right">
        Save
      </Button>
    </form>
  );
};

export default AddPricing;
