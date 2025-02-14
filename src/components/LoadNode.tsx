import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FolderIcon } from "lucide-react";
import { Handle, Position } from '@xyflow/react';

export default function LoadNode({ data }: { data: any }) {
  const [uploadSource, setUploadSource] = useState("");
  const [storageMapping, setStorageMapping] = useState<Record<string, string>>({});
  const [showStorageMapping, setShowStorageMapping] = useState(false);
  const [uploadedData, setUploadedData] = useState<Array<{ variable: string, location: string }>>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  const [selectedVariable, setSelectedVariable] = useState("");

  const inputVariables = [
    { name: "df1", value: "Transformed DataFrame 1", type: "DataFrame" },
    { name: "df2", value: "Transformed DataFrame 2", type: "DataFrame" },
    { name: "df3", value: "Transformed DataFrame 3", type: "DataFrame" }
  ];

  const folderOptions = ["sample1/", "sample1/data", "sample2/", "sample2/results"];

  const handleStorageChange = (variable, value) => {
    setStorageMapping((prev) => ({ ...prev, [variable]: value }));
  };

  const handleUploadSourceChange = (value) => {
    setUploadSource(value);
    if (value === "s3") {
      setShowStorageMapping(true);
    }
  };

  const handleFolderSelect = (variable) => {
    setSelectedVariable(variable);
    setIsFolderDialogOpen(true);
  };

  const handleFolderChoice = (folder) => {
    handleStorageChange(selectedVariable, folder);
    setIsFolderDialogOpen(false);
  };

  const handleAddUpload = () => {
    const newUploads = Object.entries(storageMapping).map(([variable, location]) => ({ variable, location }));
    setUploadedData((prev) => [...prev, ...newUploads]);
    setShowStorageMapping(false);
    setIsDialogOpen(false);
  };

  return (
    <Card className="min-w-[300px]">
      <CardContent className="p-4">
        <Handle type="target" position={Position.Top} className="w-2 h-2" />
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">{data.label}</p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="text-sm px-3 py-1">+ Upload</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Configure Upload Source</DialogTitle>
              <Select value={uploadSource} onValueChange={handleUploadSourceChange}>
                <SelectTrigger className="min-w-[150px] mt-4">
                  <SelectValue placeholder="Select Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="s3">S3</SelectItem>
                  <SelectItem value="cm">CM</SelectItem>
                  <SelectItem value="sm">SM</SelectItem>
                </SelectContent>
              </Select>
              {showStorageMapping && (
                <Card className="w-full p-4 border rounded-lg mt-4">
                  <CardContent>
                    <p className="text-lg font-medium mb-2">Storage Mapping</p>
                    <Table>
                      <TableBody>
                        {inputVariables.map((variable, index) => (
                          <TableRow key={index}>
                            <TableCell>{variable.name}</TableCell>
                            <TableCell className="flex items-center gap-2">
                              <Input
                                className="w-full p-2"
                                value={storageMapping[variable.name] || ""}
                                onChange={(e) => handleStorageChange(variable.name, e.target.value)}
                              />
                              <Dialog open={isFolderDialogOpen} onOpenChange={setIsFolderDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button className="p-2" onClick={() => handleFolderSelect(variable.name)}>
                                    <FolderIcon className="w-5 h-5" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogTitle>Select a Folder</DialogTitle>
                                  {folderOptions.map((folder) => (
                                    <Button key={folder} className="w-full text-left p-2" onClick={() => handleFolderChoice(folder)}>
                                      {folder}
                                    </Button>
                                  ))}
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Button className="mt-4 bg-green-500 text-white p-2 rounded" onClick={handleAddUpload}>Add Upload</Button>
                  </CardContent>
                </Card>
              )}
            </DialogContent>
          </Dialog>
        </div>
        {uploadedData.length > 0 && (
          <div className="mt-4 text-sm">
            <p className="font-medium mb-2">Uploaded Variables</p>
            {uploadedData.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-1">
                <span>{item.variable}</span>
                <span className="text-gray-500">{item.location}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
