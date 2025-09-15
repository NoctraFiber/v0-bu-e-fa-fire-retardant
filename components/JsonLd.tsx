import React from "react"

interface JsonLdProps {
  data: object
}

/**
 * A React component to embed JSON-LD data into the head of a document for SEO.
 * It renders a <script> tag with the type "application/ld+json".
 *
 * @param {JsonLdProps} props The component props.
 * @param {object} props.data The JSON-LD data object to be stringified and rendered.
 * @returns A <script> element with the JSON-LD data.
 */
const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default JsonLd
