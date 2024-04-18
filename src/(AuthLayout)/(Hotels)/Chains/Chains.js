"use client";
import { Button, Input, Modal, Popover, Table } from "antd";
import React, { useEffect, useState } from "react";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { BsFilter } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { GET_API } from "../../components/API/GetAPI";
import AddChains from "./AddChains";
import EditChains from "./EditChains";
import { EditIcon } from "../../components/Customized/EditIcon";

const Chains = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalEdit = () => {
    setIsModalOpenEdit(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpenEdit(false);
  };
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const filteredData = dataSource.filter((item) => {
    return item.name.toLowerCase().includes(nameFilter.toLocaleLowerCase());
  });
  const getChains = async () => {
    const GET_ALL = `{
      getchains {
        id
        name
    }
  }`;
    const query = GET_ALL;
    const path = "";
    setLoading(true);
    try {
      const res = await GET_API(path, { params: { query } });
      console.log(res);
      if (res.data) {
        const tableArray = res.data.getchains?.map((item) => ({
          key: item.id,
          id: item.id,
          name: item.name,
          description: item.description,
        }));
        setDataSource(tableArray);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getChains();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },

    {
      title: "Chains",
      dataIndex: "name",
      key: "Chains",
      sorter: (a, b) => (a.Chains ? a.Chains.localeCompare(b.Chains) : ""),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <span className="w-full flex justify-center">
          <Popover
            content={
              <div className="flex flex-col gap-3">
                <Button onClick={showModalEdit} className="action-btn">
                  edit
                </Button>
              </div>
            }
          >
            {EditIcon}
          </Popover>
          <Modal
            className=""
            footer={false}
            open={isModalOpenEdit}
            onOk={handleCancel}
            onCancel={handleCancel}
          >
            <EditChains
              record={record}
              getChains={getChains}
              handleCancel={handleCancel}
            />
          </Modal>
        </span>
      ),
    },
  ];

  return (
    <section>
      <div className="flex justify-between mb-2">
        <div className="flex">
          <Input
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="search-bar"
            prefix={<SearchOutlined />}
            placeholder="Search Name"
          />
          <Button className="filter-bar" icon={<BsFilter />}>
            Filter
          </Button>
        </div>
        <Button
          onClick={showModal}
          className="button-bar"
          icon={<PlusOutlined />}
        >
          Add Chains
        </Button>
        <Modal
          className=""
          footer={false}
          open={isModalOpen}
          onOk={handleCancel}
          onCancel={handleCancel}
        >
          <AddChains getChains={getChains} handleCancel={handleCancel} />
        </Modal>
      </div>
      <Table
        size="small"
        dataSource={filteredData}
        columns={columns}
        pagination={false}
        loading={loading}
      />
    </section>
  );
};

export default Chains;
