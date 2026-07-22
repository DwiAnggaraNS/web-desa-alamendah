import * as React from "react"

const Table = React.forwardRef(({ className = "", ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={`w-full caption-bottom text-sm ${className}`}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef(({ className = "", ...props }, ref) => (
  <thead ref={ref} className={`[&_tr]:border-b border-secondary-container bg-surface-container-low ${className}`} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef(({ className = "", ...props }, ref) => (
  <tbody
    ref={ref}
    className={`[&_tr:last-child]:border-0 ${className}`}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef(({ className = "", ...props }, ref) => (
  <tfoot
    ref={ref}
    className={`border-t border-secondary-container bg-surface-container-low font-medium [&>tr]:last:border-b-0 ${className}`}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef(({ className = "", ...props }, ref) => (
  <tr
    ref={ref}
    className={`border-b border-secondary-container transition-colors hover:bg-surface-container/50 data-[state=selected]:bg-surface-container-high ${className}`}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef(({ className = "", ...props }, ref) => (
  <th
    ref={ref}
    className={`h-12 px-4 text-left align-middle font-semibold text-secondary [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef(({ className = "", ...props }, ref) => (
  <td
    ref={ref}
    className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 text-on-surface ${className}`}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef(({ className = "", ...props }, ref) => (
  <caption
    ref={ref}
    className={`mt-4 text-sm text-secondary ${className}`}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
}
