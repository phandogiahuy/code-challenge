import { SwapOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Space } from "antd";
import { dataCurrency } from "../data/currency.ts";
import { useState } from "react";
const FormComponent = () => {
  const [amountUnit, setAmountUnit] = useState<{ value: string; unit: string }>(
    {
      value: "",
      unit: dataCurrency[0].currency,
    }
  );
  const [unitReceive, setUnitReceive] = useState<string>("");
  const [isSend, setSend] = useState(false);
  const [swaped, setSwaped] = useState(false);
  let convertAmountSendToUsd: number = 0;
  let convertAmountSendToReceived: number = 0;

  // Converted the amount to send to USD
  for (let i = 0; i < dataCurrency.length; i++) {
    if (dataCurrency[i].currency === amountUnit.unit) {
      convertAmountSendToUsd = Number(amountUnit.value) * dataCurrency[i].price;
    }
  }

  // Converted the number of usd to the amount of received token
  for (let i = 0; i < dataCurrency.length; i++) {
    if (dataCurrency[i].currency === unitReceive) {
      convertAmountSendToReceived =
        convertAmountSendToUsd / dataCurrency[i].price;
    }
  }

  const submitSwap = () => {
    setSend(true);
    setTimeout(() => {
      setSend(false);
      setSwaped(true);
      message.success("Successful Swap");
    }, 1000);
  };
  return (
    <div className="mt-20 bg-gradient-to-r from-slate-900 to-slate-700 h-[300px] flex justify-center items-center rounded-xl w-2/6 shadow-[-19px_3px_41px_23px_#903396BF]">
      <Form
        layout="horizontal"
        style={{ width: 500 }}
        size="large"
        onFinish={submitSwap}
      >
        <Form.Item
          name="amountSend"
          label={
            <p
              style={{
                fontSize: "20px",
                fontFamily: "serif",
                color: "antiquewhite",
              }}
            >
              Amount to send
            </p>
          }
          colon={false}
          rules={[
            { required: true, message: "Please enter a covert ammount" },
            {
              min: 1,
              message: "Amount must be a positive number",
            },
          ]}
        >
          <Space>
            <Input
              placeholder="Amount to send"
              style={{ marginLeft: "17px", width: "206px" }}
              type="number"
              min={0}
              value={amountUnit.value}
              onChange={(e) =>
                setAmountUnit((state) => ({
                  ...state,
                  value: e.target.value,
                }))
              }
            />
            <Select
              defaultValue={dataCurrency[0].currency}
              options={dataCurrency.map((currency) => ({
                value: currency.currency,
                label: (
                  <Space>
                    <img
                      src={currency.url}
                      style={{
                        width: "25px",
                        marginRight: "8px",
                        marginTop: "5px",
                      }}
                    />
                    {currency.currency}
                  </Space>
                ),
              }))}
              style={{ width: "130px" }}
              onChange={(e) =>
                setAmountUnit((state) => ({ ...state, unit: e }))
              }
            />
          </Space>
        </Form.Item>
        <Form.Item
          name="amountReceive"
          label={
            <p
              style={{
                fontSize: "20px",
                fontFamily: "serif",
                color: "antiquewhite",
              }}
            >
              Amount to receive
            </p>
          }
          colon={false}
        >
          <Space>
            <Input
              placeholder="Amount to received"
              value={convertAmountSendToReceived}
            />
            <Select
              options={dataCurrency.map((currency) => ({
                value: currency.currency,
                label: (
                  <Space>
                    <img
                      src={currency.url}
                      style={{
                        width: "25px",
                        marginRight: "5px",
                        marginTop: "5px",
                      }}
                    />
                    {currency.currency}
                  </Space>
                ),
              }))}
              style={{ width: "130px" }}
              placeholder="Select token"
              value={unitReceive}
              onChange={(e) => setUnitReceive(e)}
            />
          </Space>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "200px" }}
            loading={isSend}
          >
            <SwapOutlined /> Swap
          </Button>
        </Form.Item>
        {swaped && (
          <p className="text-slate-100 text-xl font-serif">{`You receive ${convertAmountSendToReceived} ${unitReceive} `}</p>
        )}
      </Form>
    </div>
  );
};

export default FormComponent;
