
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2,
  File,
  Download
} from 'lucide-react';
import { 
  Button
} from "@/components/ui/button";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Input
} from "@/components/ui/input";
import { 
  Label
} from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

interface Document {
  id: string;
  name: string;
  type: string;
  relatedTo: string;
  relatedId: string;
  uploadDate: string;
  size: string;
  status: "active" | "archived";
}

const Documents = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Contract-Acme-Corp.pdf",
      type: "Contract",
      relatedTo: "Lead",
      relatedId: "L001",
      uploadDate: "2023-05-12",
      size: "1.2 MB",
      status: "active"
    },
    {
      id: "2",
      name: "Invoice-123.pdf",
      type: "Invoice",
      relatedTo: "Order",
      relatedId: "O003",
      uploadDate: "2023-06-15",
      size: "0.8 MB",
      status: "active"
    },
    {
      id: "3",
      name: "Manufacturer-Agreement.docx",
      type: "Agreement",
      relatedTo: "Manufacturer",
      relatedId: "M002",
      uploadDate: "2023-04-22",
      size: "2.1 MB",
      status: "archived"
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [newDocument, setNewDocument] = useState({
    name: "",
    type: "",
    relatedTo: "",
    relatedId: "",
  });

  const handleAddDocument = () => {
    const doc: Document = {
      id: Math.random().toString(36).substr(2, 9),
      name: newDocument.name,
      type: newDocument.type,
      relatedTo: newDocument.relatedTo,
      relatedId: newDocument.relatedId,
      uploadDate: new Date().toISOString().split('T')[0],
      size: "0.5 MB", // Placeholder
      status: "active"
    };
    
    setDocuments([...documents, doc]);
    setIsAddDialogOpen(false);
    setNewDocument({
      name: "",
      type: "",
      relatedTo: "",
      relatedId: "",
    });
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.relatedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Document Management</h1>
      
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documents..."
              className="w-[250px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Document</DialogTitle>
              <DialogDescription>
                Upload a new document to the system.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={newDocument.name}
                  onChange={(e) => setNewDocument({...newDocument, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  onValueChange={(value) => setNewDocument({...newDocument, type: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Invoice">Invoice</SelectItem>
                    <SelectItem value="Agreement">Agreement</SelectItem>
                    <SelectItem value="Proposal">Proposal</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="relatedTo" className="text-right">
                  Related To
                </Label>
                <Select
                  onValueChange={(value) => setNewDocument({...newDocument, relatedTo: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select entity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lead">Lead</SelectItem>
                    <SelectItem value="Order">Order</SelectItem>
                    <SelectItem value="Manufacturer">Manufacturer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="relatedId" className="text-right">
                  Related ID
                </Label>
                <Input
                  id="relatedId"
                  className="col-span-3"
                  value={newDocument.relatedId}
                  onChange={(e) => setNewDocument({...newDocument, relatedId: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  File
                </Label>
                <Input
                  id="file"
                  type="file"
                  className="col-span-3"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddDocument}>
                Upload Document
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Related To</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <File className="h-4 w-4 mr-2 text-blue-500" />
                        {doc.name}
                      </div>
                    </TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>
                      {doc.relatedTo} ({doc.relatedId})
                    </TableCell>
                    <TableCell>{doc.uploadDate}</TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell>
                      <Badge
                        variant={doc.status === "active" ? "default" : "secondary"}
                      >
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No documents found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documents;
