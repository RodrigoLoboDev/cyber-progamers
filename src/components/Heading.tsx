
type HeadingProps = {
    heading: string
    span: string
}

const Heading = ({heading, span} : HeadingProps) => {
    return (
      <>
          <div className=" flex justify-center my-10">
              <h2 className=" text-center uppercase text-lg md:text-xl leading-3 inline-block heading">{heading} <span className=" block font-black text-2xl md:text-4xl text-cyan-900">{span}</span></h2>
          </div> 
      </>
    )
  }
  
  export default Heading