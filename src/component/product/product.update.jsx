import React, { useEffect, useState } from "react";
import { Checkbox, Form, FormProps, Input, InputNumber, Modal, notification, Radio, Select } from "antd";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";


const UpdateProduct = (props) => {
    const { getData, isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                title: dataUpdate.title,
                price: dataUpdate.price,
                description: dataUpdate.description,
            })
        }
    }, [dataUpdate])


    const onFinish = async (values) => {
        // lay data

        const { title, price, description } = values;

        // gui data len sever
        if (dataUpdate) {
            const data = {
                id: dataUpdate.id,
                title, price, description
            }
            console.log(">>>>check data", data);

            const res = await fetch(`http://localhost:3000/products/${data.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })


            if (res.status === 200) {
                await getData();
                notification.success({
                    message: "update product thành công!"
                })
                handleCloseCreateModal();
            }
            else {
                notification.error({
                    message: "Update product thất bại"
                })
            }
        }


    };


    // close modal
    const handleCloseCreateModal = () => {
        setIsUpdateModalOpen(false);
        form.resetFields();
        setDataUpdate(null);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            open={isUpdateModalOpen}
            onOk={() => form.submit()}
            onCancel={handleCloseCreateModal}
            maskClosable={false}
        >
            <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                form={form}
            >
                <Form.Item
                    label="Tên sản phẩm"
                    name="title"
                    rules={[{ required: true, message: 'Nhập tên sản phẩm!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Giá"
                    name="price"
                    rules={[{ required: true, message: 'Nhập giá!' }]}
                >
                    <Input type="number" />
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'Nhập mô tả!' }]}
                >
                    <TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateProduct;
