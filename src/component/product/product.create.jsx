import React, { useEffect, useState } from "react";
import { Checkbox, Form, FormProps, Input, InputNumber, Modal, notification, Radio, Select } from "antd";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";


const CreateProduct = (props) => {
    const { getData, isCreateModalOpen, setIsCreateModalOpen } = props;
    const [form] = Form.useForm();




    const onFinish = async (values) => {
        // lay data

        const { title, price, description } = values;
        const data = { title, price, description };

        // gui data len sever

        const res = await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })


        if (res.status === 200) {
            await getData();
            notification.success({
                message: "Tạo mới product thành công!"
            })
            handleCloseCreateModal();
        }
        else {
            notification.error({
                message: "Tạo mới product thất bại"
            })
        }
    };


    // close modal
    const handleCloseCreateModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            open={isCreateModalOpen}
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

export default CreateProduct;
