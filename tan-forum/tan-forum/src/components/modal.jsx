
import React,{Component} from 'react';
import {
    Modal, Button ,Input,Icon
} from 'antd';
const { TextArea } = Input;
export default class Modals extends Component {
    state = {
        loading: false,
        visible: false,
    }



    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 1000);
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }


    render() {

        var { visible, loading } = this.state;
        this.setState({
            visible:this.props.visible
        })
        console.log(visible);

        return (
            <div>

                <Modal
                    visible={visible}
                    title="请输入您要发表的内容"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            发表
                        </Button>,
                    ]}
                >
                    <input
                        placeholder="输入您的标题"
                        prefix={<Icon type="tags" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                    <TextArea rows={4}/>
                </Modal>
            </div>
        );
    }
}
