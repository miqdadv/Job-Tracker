import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import Footer from "../components_lite/Footer";
import ApplicationList from "./ApplicationList";
import KanbanBoard from "./KanbanBoard";
import FilterBar from "./FilterBar";
import SearchInput from "./SearchInput";
import Pagination from "./Pagination";
import BookmarkedSection from "./BookmarkedSection";
import useGetTrackedApplications from "@/hooks/useGetTrackedApplications";
import { useSelector, useDispatch } from "react-redux";
import { setStatusFilter, setSearchFilter, clearFilters, setPage } from "@/redux/slices/trackerSlice";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { X, Briefcase, LayoutGrid, List } from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { filters, trackedApplications, pagination } = useSelector((store) => store.tracker);
  const [viewMode, setViewMode] = useState("kanban");

  useGetTrackedApplications();

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const statusCounts = trackedApplications.reduce(
    (acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    },
    { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 }
  );

  const hasActiveFilters = filters.status || filters.search;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="h-8 w-8 text-gray-700 dark:text-gray-300" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Application Tracker
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Track and manage your job applications in one place.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-950 dark:border-blue-800">
              <p className="text-sm text-blue-600 font-medium dark:text-blue-400">Applied</p>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                {statusCounts.Applied}
              </p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-950 dark:border-yellow-800">
              <p className="text-sm text-yellow-600 font-medium dark:text-yellow-400">Interview</p>
              <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">
                {statusCounts.Interview}
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 dark:bg-green-950 dark:border-green-800">
              <p className="text-sm text-green-600 font-medium dark:text-green-400">Offer</p>
              <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                {statusCounts.Offer}
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 dark:bg-red-950 dark:border-red-800">
              <p className="text-sm text-red-600 font-medium dark:text-red-400">Rejected</p>
              <p className="text-2xl font-bold text-red-800 dark:text-red-200">
                {statusCounts.Rejected}
              </p>
            </div>
          </div>

          {/* Filter, Search, and View Toggle Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <FilterBar />
            <div className="flex items-center gap-3 sm:ml-auto">
              <SearchInput />
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "kanban" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("kanban")}
                  className="px-3"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-gray-600 dark:text-gray-400 text-sm">Active filters:</span>
              {filters.status && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Status: {filters.status}
                  <button
                    onClick={() => dispatch(setStatusFilter(""))}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.search && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {filters.search}
                  <button
                    onClick={() => dispatch(setSearchFilter(""))}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Clear all
              </Button>
            </div>
          )}

          {viewMode === "list" ? <ApplicationList /> : <KanbanBoard />}

          {/* Pagination - only show in list view */}
          {viewMode === "list" && (
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              limit={pagination.limit}
              onPageChange={handlePageChange}
              className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
            />
          )}

          {/* Bookmarked Jobs Section */}
          <BookmarkedSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
