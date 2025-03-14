import * as React from "react"

const Chart = React.forwardRef<
  React.ElementRef<typeof React.Fragment>,
  React.ComponentPropsWithoutRef<typeof React.Fragment>
>(({ children, ...props }, ref) => (
  <React.Fragment ref={ref} {...props}>
    {children}
  </React.Fragment>
))
Chart.displayName = "Chart"

const ChartContainer = React.forwardRef<
  React.ElementRef<typeof React.Fragment>,
  React.ComponentPropsWithoutRef<typeof React.Fragment>
>(({ children, ...props }, ref) => <div {...props}>{children}</div>)
ChartContainer.displayName = "ChartContainer"

const ChartTitle = React.forwardRef<React.ElementRef<"h3">, React.ComponentPropsWithoutRef<"h3">>(
  ({ children, ...props }, ref) => <h3 {...props}>{children}</h3>,
)
ChartTitle.displayName = "ChartTitle"

const ChartLegend = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ children, ...props }, ref) => <div {...props}>{children}</div>,
)
ChartLegend.displayName = "ChartLegend"

const ChartTooltip = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ children, ...props }, ref) => <div {...props}>{children}</div>,
)
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ children, ...props }, ref) => <div {...props}>{children}</div>,
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartTooltipItem = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ children, ...props }, ref) => <div {...props}>{children}</div>,
)
ChartTooltipItem.displayName = "ChartTooltipItem"

const ChartSeries = React.forwardRef<
  React.ElementRef<typeof React.Fragment>,
  React.ComponentPropsWithoutRef<typeof React.Fragment>
>(({ children, ...props }, ref) => (
  <React.Fragment ref={ref} {...props}>
    {children}
  </React.Fragment>
))
ChartSeries.displayName = "ChartSeries"

const ChartSeriesItem = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ children, ...props }, ref) => <div {...props}>{children}</div>,
)
ChartSeriesItem.displayName = "ChartSeriesItem"

const ChartValueAxis = React.forwardRef<
  React.ElementRef<typeof React.Fragment>,
  React.ComponentPropsWithoutRef<typeof React.Fragment>
>(({ children, ...props }, ref) => (
  <React.Fragment ref={ref} {...props}>
    {children}
  </React.Fragment>
))
ChartValueAxis.displayName = "ChartValueAxis"

const ChartValueAxisItem = React.forwardRef<
  React.ElementRef<"div">,
  { title?: { text: string } } & React.ComponentPropsWithoutRef<"div">
>(({ title, children, ...props }, ref) => (
  <div {...props}>
    {title?.text}
    {children}
  </div>
))
ChartValueAxisItem.displayName = "ChartValueAxisItem"

const ChartCategoryAxis = React.forwardRef<
  React.ElementRef<typeof React.Fragment>,
  React.ComponentPropsWithoutRef<typeof React.Fragment>
>(({ children, ...props }, ref) => (
  <React.Fragment ref={ref} {...props}>
    {children}
  </React.Fragment>
))
ChartCategoryAxis.displayName = "ChartCategoryAxis"

const ChartCategoryAxisItem = React.forwardRef<
  React.ElementRef<"div">,
  { categories?: string[] } & React.ComponentPropsWithoutRef<"div">
>(({ categories, children, ...props }, ref) => (
  <div {...props}>
    {categories?.join(", ")}
    {children}
  </div>
))
ChartCategoryAxisItem.displayName = "ChartCategoryAxisItem"

export {
  Chart,
  ChartContainer,
  ChartTitle,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  ChartTooltipItem,
  ChartSeries,
  ChartSeriesItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
}

