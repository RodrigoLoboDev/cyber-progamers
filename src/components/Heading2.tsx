
type Heading2Props = {
    heading: string
}

const Heading2 = ({heading} : Heading2Props) => {
    return (
      <>
          <div className=" flex mt-10 mb-5">
              <h2 className=" uppercase md:text-2xl text-xl leading-5 md:leading-7 font-black heading2">{heading}</h2>
          </div> 
      </>
    )
  }
  
  export default Heading2