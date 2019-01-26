# execute-scripts

A utility function that executes code in `<script>` tags inside a DOM node, all while preserving the DOM structure.

The use case is that sometimes an external service provides a block of HTML that needs to be added to your page, and parts of this HTML might contain scripts that need to be run. For a non-SPA you can just render the script, but for an SPA the scripts will not be executed in this case.
