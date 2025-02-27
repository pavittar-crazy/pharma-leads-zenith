
import React, { useState } from "react";
import { 
  MoreHorizontal, 
  Star, 
  Edit, 
  Trash, 
  Phone, 
  Mail, 
  CheckCircle2, 
  XCircle,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import SearchInput from "@/components/common/SearchInput";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  status: "new" | "contacted" | "negotiation" | "closed" | "lost";
  score: number;
  lastContact: string;
  priority: "high" | "medium" | "low";
}

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Amit Sharma",
    company: "MediCorp Pharmaceuticals",
    email: "asharma@medicorp.com",
    phone: "+91 98765 43210",
    location: "Mumbai, MH",
    status: "new",
    score: 85,
    lastContact: "2023-10-12",
    priority: "high",
  },
  {
    id: "2",
    name: "Priya Patel",
    company: "LifeCare Drugs",
    email: "priya@lifecare.in",
    phone: "+91 87654 32109",
    location: "Ahmedabad, GJ",
    status: "contacted",
    score: 72,
    lastContact: "2023-10-14",
    priority: "medium",
  },
  {
    id: "3",
    name: "Rajiv Mehta",
    company: "Wellness Pharma",
    email: "rajiv@wellnesspharma.com",
    phone: "+91 76543 21098",
    location: "Pune, MH",
    status: "negotiation",
    score: 91,
    lastContact: "2023-10-08",
    priority: "high",
  },
  {
    id: "4",
    name: "Sunita Gupta",
    company: "Global Health Solutions",
    email: "sunita@ghsolutions.in",
    phone: "+91 65432 10987",
    location: "Delhi, DL",
    status: "closed",
    score: 95,
    lastContact: "2023-10-05",
    priority: "medium",
  },
  {
    id: "5",
    name: "Vikram Reddy",
    company: "PureCare Pharmaceuticals",
    email: "vikram@purecare.com",
    phone: "+91 54321 09876",
    location: "Hyderabad, TG",
    status: "lost",
    score: 45,
    lastContact: "2023-09-28",
    priority: "low",
  },
  {
    id: "6",
    name: "Nisha Kapoor",
    company: "Nova Medical Supplies",
    email: "nisha@novamedical.in",
    phone: "+91 43210 98765",
    location: "Bangalore, KA",
    status: "new",
    score: 78,
    lastContact: "2023-10-15",
    priority: "high",
  },
  {
    id: "7",
    name: "Sanjay Verma",
    company: "Healthway Industries",
    email: "sverma@healthway.com",
    phone: "+91 32109 87654",
    location: "Chennai, TN",
    status: "contacted",
    score: 68,
    lastContact: "2023-10-11",
    priority: "medium",
  },
  {
    id: "8",
    name: "Ananya Singh",
    company: "VitaPlus Pharmaceuticals",
    email: "asingh@vitaplus.in",
    phone: "+91 21098 76543",
    location: "Kolkata, WB",
    status: "negotiation",
    score: 88,
    lastContact: "2023-10-09",
    priority: "high",
  },
];

const LeadTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [leadFilter, setLeadFilter] = useState("all");
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const getStatusBadge = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return <Badge className="badge-info">New</Badge>;
      case "contacted":
        return <Badge className="badge-primary">Contacted</Badge>;
      case "negotiation":
        return <Badge className="badge-warning">Negotiation</Badge>;
      case "closed":
        return <Badge className="badge-success">Closed</Badge>;
      case "lost":
        return <Badge className="badge-danger">Lost</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getPriorityIcon = (priority: Lead["priority"]) => {
    switch (priority) {
      case "high":
        return <Star className="h-4 w-4 text-amber-500 fill-amber-500" />;
      case "medium":
        return <Star className="h-4 w-4 text-amber-400" />;
      case "low":
        return <Star className="h-4 w-4 text-gray-300" />;
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20";
    if (score >= 60) return "text-amber-600 bg-amber-50 dark:bg-amber-900/20";
    return "text-rose-600 bg-rose-50 dark:bg-rose-900/20";
  };

  const getFilteredLeads = () => {
    let filtered = [...mockLeads];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(query) ||
          lead.company.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.location.toLowerCase().includes(query)
      );
    }
    
    // Filter by lead status
    if (leadFilter !== "all") {
      filtered = filtered.filter((lead) => lead.status === leadFilter);
    }

    // Sort the leads
    if (sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[sortBy as keyof Lead];
        const bValue = b[sortBy as keyof Lead];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        return 0;
      });
    }
    
    return filtered;
  };

  const filteredLeads = getFilteredLeads();
  
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <SearchInput
          placeholder="Search leads..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={clearSearch}
          className="sm:w-[300px]"
        />
        <Tabs value={leadFilter} onValueChange={setLeadFilter}>
          <TabsList>
            <TabsTrigger value="all">All Leads</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="contacted">Contacted</TabsTrigger>
            <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="rounded-md border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[50px]">Priority</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("name")}
                  className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
                >
                  Lead
                  <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("location")}
                  className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
                >
                  Location
                  <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("status")}
                  className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
                >
                  Status
                  <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("score")}
                  className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
                >
                  Score
                  <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("lastContact")}
                  className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
                >
                  Last Contact
                  <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No leads found. Try adjusting your search or filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="group transition-colors hover:bg-muted/30">
                  <TableCell>
                    <div className="flex justify-center">
                      {getPriorityIcon(lead.priority)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${lead.name}`} alt={lead.name} />
                        <AvatarFallback>{lead.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-0.5">
                        <p className="font-medium text-sm">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">{lead.company}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm">{lead.location}</span>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(lead.status)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge
                      variant="outline"
                      className={cn("font-mono text-xs px-2", getScoreColor(lead.score))}
                    >
                      {lead.score}%
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-sm">
                      {new Date(lead.lastContact).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit Lead</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            <span>Mark as Contacted</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <XCircle className="mr-2 h-4 w-4" />
                            <span>Mark as Lost</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeadTable;
