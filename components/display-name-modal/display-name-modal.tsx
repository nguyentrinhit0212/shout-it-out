import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface DisplayNameModalProps {
  onSetDisplayName: (name: string) => void;
}

const DisplayNameModal: React.FC<DisplayNameModalProps> = ({
  onSetDisplayName,
}) => {
  const [name, setName] = useState<string>("");

  const handleSetName = () => {
    if (name.trim()) {
      onSetDisplayName(name);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Set a display name</h2>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
          placeholder="Enter display name..."
        />
        <Button
          variant={"default"}
          onClick={handleSetName}
          className="mt-4 px-4 py-2"
        >
          Set
        </Button>
      </div>
    </div>
  );
};

export default DisplayNameModal;
