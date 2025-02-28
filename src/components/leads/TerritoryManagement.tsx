
import React from "react";
import { Plus, MapPin, Users, TrendingUp, Edit, Trash, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const TerritoryManagement: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Territory Management</CardTitle>
            <CardDescription>Organize and manage sales territories for your team</CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Territory
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="md:w-1/3 space-y-4">
            <div className="rounded-md border p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Active Territories</h3>
                <Badge>8 Total</Badge>
              </div>
              
              <Input placeholder="Search territories..." />
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start h-auto py-3">
                  <div className="flex items-center">
                    <Badge className="mr-3 bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400">
                      <MapPin className="h-3 w-3 mr-1" />
                      N
                    </Badge>
                    <div className="text-left">
                      <p className="font-medium">North India</p>
                      <p className="text-xs text-muted-foreground">Delhi, Haryana, Punjab</p>
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline" className="w-full justify-start h-auto py-3 bg-muted">
                  <div className="flex items-center">
                    <Badge className="mr-3 bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400">
                      <MapPin className="h-3 w-3 mr-1" />
                      W
                    </Badge>
                    <div className="text-left">
                      <p className="font-medium">West India</p>
                      <p className="text-xs text-muted-foreground">Maharashtra, Gujarat</p>
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline" className="w-full justify-start h-auto py-3">
                  <div className="flex items-center">
                    <Badge className="mr-3 bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400">
                      <MapPin className="h-3 w-3 mr-1" />
                      S
                    </Badge>
                    <div className="text-left">
                      <p className="font-medium">South India</p>
                      <p className="text-xs text-muted-foreground">Karnataka, Tamil Nadu, Kerala</p>
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline" className="w-full justify-start h-auto py-3">
                  <div className="flex items-center">
                    <Badge className="mr-3 bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400">
                      <MapPin className="h-3 w-3 mr-1" />
                      E
                    </Badge>
                    <div className="text-left">
                      <p className="font-medium">East India</p>
                      <p className="text-xs text-muted-foreground">West Bengal, Odisha</p>
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">West India Territory</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
                <CardDescription>Maharashtra, Gujarat, Goa</CardDescription>
                <Separator className="mt-3" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-muted-foreground">Created</h4>
                    <p>Jan 15, 2023</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-muted-foreground">Lead Count</h4>
                    <p>243 Leads</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-muted-foreground">Performance</h4>
                    <div className="flex items-center">
                      <Badge variant="outline" className="font-mono bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 mr-1">+18%</Badge>
                      <span>vs Target</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Territory Team</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Sales (MTD)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=Sneha Desai" />
                                <AvatarFallback>SD</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">Sneha Desai</p>
                                <p className="text-xs text-muted-foreground">sneha@pavittar-pharma.com</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>Territory Manager</TableCell>
                          <TableCell>
                            <Badge className="badge-success">Active</Badge>
                          </TableCell>
                          <TableCell>₹12.8L</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=Amit Verma" />
                                <AvatarFallback>AV</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">Amit Verma</p>
                                <p className="text-xs text-muted-foreground">amit@pavittar-pharma.com</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>Sales Executive</TableCell>
                          <TableCell>
                            <Badge className="badge-success">Active</Badge>
                          </TableCell>
                          <TableCell>₹8.4L</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=Kiran Patel" />
                                <AvatarFallback>KP</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">Kiran Patel</p>
                                <p className="text-xs text-muted-foreground">kiran@pavittar-pharma.com</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>Sales Executive</TableCell>
                          <TableCell>
                            <Badge className="badge-success">Active</Badge>
                          </TableCell>
                          <TableCell>₹7.2L</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-1" />
                      Assign Team Members
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Territory Targets</h3>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit Targets
                    </Button>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-md border p-3 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Q1 2024</p>
                      <p className="text-xl font-bold">₹46L</p>
                      <div className="mt-1 flex items-center justify-center text-xs">
                        <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
                        <span className="text-emerald-500">18% achieved</span>
                      </div>
                    </div>
                    <div className="rounded-md border p-3 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Q2 2024</p>
                      <p className="text-xl font-bold">₹52L</p>
                      <div className="mt-1 flex items-center justify-center text-xs">
                        <span className="text-muted-foreground">Not started</span>
                      </div>
                    </div>
                    <div className="rounded-md border p-3 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Annual 2024</p>
                      <p className="text-xl font-bold">₹210L</p>
                      <div className="mt-1 flex items-center justify-center text-xs">
                        <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
                        <span className="text-emerald-500">4% achieved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TerritoryManagement;
