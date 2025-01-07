import { useEffect, useState } from "react"
import axios from "axios";
import { Table, notification, Button, Popconfirm, } from 'antd';
import CreateProduct from "./product.create";
import UpdateProduct from "./product.update";
import { Link } from "react-router";


const ProductTable = () => {
    const [listProduct, setListProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);


    const getData = async () => {
        const res = await axios.get("http://localhost:3000/products");

        console.log(res);

        if (!res.data) {
            notification.error({
                message: "lỗi fetch data"
            })
        }
        setListProduct(res.data);
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, [])


    // confirm delete table
    const confirm = async (product) => {
        const res = await axios.delete(`http://localhost:3000/products/${product.id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        console.log(">>>>>>>check res ", res);

        if (res.status === 200) {
            notification.success({
                message: "Xóa product thành công!"
            })
            getData();
        } else {
            notification.error({
                message: "Xóa product lỗi!"
            })
        }
    };

    // table
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            render: (value, record) => {
                return (<Link to={`/product/${record.id}`}>{record.title}</Link>)
            }
        },
        {
            title: 'Price',
            dataIndex: "price",
        },
        {
            title: 'Description',
            dataIndex: "description",
        },
        {
            title: 'Action',
            render: (value, record) => {
                return (
                    <div style={{ display: "flex", gap: "20px" }}>
                        <Button
                            onClick={() => {
                                console.log(record)
                                setDataUpdate(record);
                                setIsUpdateModalOpen(true)
                            }}>
                            Edit
                        </Button>
                        <Popconfirm
                            title="Delete the product"
                            description={`bạn có muốn xóa product ${record.title} này ?`}
                            onConfirm={() => confirm(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                className='button-delete'
                                danger
                            >
                                Delete
                            </Button>
                        </Popconfirm>
                    </div>
                )
            }
        },
    ];

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h2>Product Table</h2>
                <div>
                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        type="primary"
                    >
                        Add new
                    </Button>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={listProduct}
                rowKey={"id"}
                loading={loading}
            />

            <CreateProduct
                getData={getData}
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />

            <UpdateProduct
                getData={getData}
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>

    )
}

export default ProductTable