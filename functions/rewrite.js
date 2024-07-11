export async function handleHttpRequest(request, context) {
  // This definition replaces <esi:include src="..." /> the response from the src
  // Get the HTML from the origin server and stream the response body through the
  // HtmlTransformer to the Response object
  return fetch(request.url, { edgio: { origin: "origin" } }).then(
    (response) => {
      let transformedResponse = HtmlTransformer.stream(
        [
          // {
          //   selector: "nav",
          //   element: async (el) => {
          //     el.set_attribute("style", "background: red")
          //   },
          // },
          {
            // Since this operates on the document, there is no need to specify a selector
            doc_end: async (d) => {
              // Use the append() method to append the timestamp to the end of the document
              // Specify 'html' as the second arguemnt to indicate the content is HTML, not plain text
              d.append(
                `<script>console.log('[Edgio] Response transformed at ${new Date().toISOString()} by Edgio')</script>`,
                "html"
              )
            },
          },
        ],
        response
      )
      // Make any changes to the response headers here.
      transformedResponse.headers.set("x-html-transformer-ran", "v4")

      // no cache
      transformedResponse.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, max-age=0"
      )

      return transformedResponse
    }
  )
}
