
import { useState, useEffect } from "react";
import { Handle, Position } from '@xyflow/react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FolderIcon } from "lucide-react";
import { NodeData } from "@/types/flow";

interface LoadNodeProps {
  data: NodeData;
  isPanel?: boolean;
  onSave?: (data: NodeData) => void;
}

interface UploadItem {
  variable: string;
  location: string;
}

interface StorageMapping {
  [key: string]: string;
}

const NodeContent = ({ data }: { data: NodeData }) => (
  <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 min-w-[150px]">
    <Handle type="target" position={Position.Left} className="w-2 h-2" />
    <div className="text-sm font-medium mb-2">{data.label}</div>
    <div className="flex flex-wrap gap-1">
      {data.inputVariables?.map((variable, index) => (
        <Badge key={index} variant="outline" className="text-xs">
          {variable.name}
        </Badge>
      ))}
    </div>
  </div>
);

const PanelContent = ({ data, onSave }: { data: NodeData; onSave?: (data: NodeData) => void }) => {
  const [uploadSource, setUploadSource] = useState("");
  const [storageMapping, setStorageMapping] = useState<StorageMapping>({});
  const [showStorageMapping, setShowStorageMapping] = useState(false);
  const [uploadedData, setUploadedData] = useState<UploadItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  const [selectedVariable, setSelectedVariable] = useState("");
  const folderOptions = ["sample1/", "sample1/data", "sample2/", "sample2/results"];

  useEffect(() => {
    const newMapping: StorageMapping = {};
    data.inputVariables?.forEach((variable) => {
      newMapping[variable.name] = '';
    });
    setStorageMapping(newMapping);
  }, [data.inputVariables]);

  const handleStorageChange = (variable: string, value: string) => {
    setStorageMapping((prev) => ({ ...prev, [variable]: value }));
  };

  const handleUploadSourceChange = (value: string) => {
    setUploadSource(value);
    if (value === "s3") {
      setShowStorageMapping(true);
    }
  };

  const handleFolderSelect = (variable: string) => {
    setSelectedVariable(variable);
    setIsFolderDialogOpen(true);
  };

  const handleFolderChoice = (folder: string) => {
    handleStorageChange(selectedVariable, folder);
    setIsFolderDialogOpen(false);
  };

  const handleAddUpload = () => {
    const newUploads = Object.entries(storageMapping)
      .filter(([, location]) => location !== '') // 값이 있는 매핑만 추가
      .map(([variable, location]) => ({ variable, location }));
    
    setUploadedData((prev) => [...prev, ...newUploads]);
    if (onSave) {
      onSave({
        ...data,
        uploadedData: [...uploadedData, ...newUploads]
      });
    }
    setShowStorageMapping(false);
    setIsDialogOpen(false);
  };

  return (
    <Card className="w-full max-w-4xl p-6 border rounded-lg">
      <CardContent className="flex flex-col gap-6">
        <p className="text-2xl font-bold">Load</p>

        <Card className="w-full p-4 border rounded-lg">
          <CardContent>
            <p className="text-lg font-medium mb-2">Input Variables</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Variable</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.inputVariables?.map((variable, index) => (
                  <TableRow key={index}>
                    <TableCell>{variable.name}</TableCell>
                    <TableCell>{variable.value || 'N/A'}</TableCell>
                    <TableCell>{variable.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="w-full p-4 border rounded-lg">
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-medium">Upload</p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="secondary" size="icon">
                    <span className="text-xl font-bold">+</span>
                  </Button>
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
                            {data.inputVariables?.map((variable, index) => (
                              <TableRow key={index}>
                                <TableCell>{variable.name}</TableCell>
                                <TableCell className="flex items-center gap-2">
                                  <Input
                                    value={storageMapping[variable.name] || ""}
                                    onChange={(e) => handleStorageChange(variable.name, e.target.value)}
                                  />
                                  <Dialog open={isFolderDialogOpen && selectedVariable === variable.name} onOpenChange={setIsFolderDialogOpen}>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="icon" onClick={() => handleFolderSelect(variable.name)}>
                                        <FolderIcon className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogTitle>Select a Folder</DialogTitle>
                                      <div className="flex flex-col gap-2 mt-4">
                                        {folderOptions.map((folder) => (
                                          <Button
                                            key={folder}
                                            variant="outline"
                                            className="justify-start"
                                            onClick={() => handleFolderChoice(folder)}
                                          >
                                            <FolderIcon className="mr-2 h-4 w-4" />
                                            {folder}
                                          </Button>
                                        ))}
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <Button className="mt-4 w-full" onClick={handleAddUpload}>
                          Add Upload
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </DialogContent>
              </Dialog>
            </div>

            {uploadedData.length > 0 && (
              <div className="mt-4">
                <p className="text-lg font-medium mb-2">Uploaded Variables</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Variable</TableHead>
                      <TableHead>Storage Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uploadedData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.variable}</TableCell>
                        <TableCell>{item.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default function LoadNode({ data, isPanel = false, onSave }: LoadNodeProps) {
  return isPanel ? <PanelContent data={data} onSave={onSave} /> : <NodeContent data={data} />;
}
