import Button from "../../../react/Button";
import Input from "../../../react/Input";
import Panel from "../../../react/Panel";

export default function App() {
  return (
    <div className="container mx-auto">
      <div>
        <h2 className="text-3xl font-bold mt-6 mb-4">Button</h2>
        <div className="flex gap-2 items-center">
          <Button>Hello</Button>
          <Button size="sm">Hello</Button>
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold mt-6 mb-4">Input</h2>
        <div className="flex gap-2 items-center">
          <Input placeholder="xxx" />
          <Input size="sm" placeholder="xxx" />
        </div>
        <div className="flex gap-2 items-center my-2">
          <Input varient="error" placeholder="xxx" />
          <Input varient="error" size="sm" placeholder="xxx" />
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold mt-6 mb-4">Panel</h2>
        <div className="">
          <Panel title="Panel" footer="Footer">
            body
          </Panel>
          <Panel title="Panel" footer={<Input size="sm" placeholder="xxx" />} className="w-96">
            body
          </Panel>
        </div>
      </div>
    </div>
  );
}
