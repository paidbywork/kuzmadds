import Link from 'components/LinkWithQuery'
import styled from 'styled-components'

import Layout from 'layouts/App'
import SEO from 'components/SEO'
import Hero from 'components/modules/Hero'
import Headline from 'components/Headline'
import { Container, Row, Col } from 'components/Grid'
import { Rte, H4 } from 'components/Typography'
import PostCond from 'components/PostCond'
import WPImage from 'components/WPImage'

const Post = ({   
  page,
  post, 
  recentPosts,   
  schema, 
  categories
}) => {        
  return (
    <Layout
      page={page}
      schema={schema}      
    >
      <SEO {...page.seo} />
      <Hero 
        {...page.hero} 
        height='auto' 
        copyFormat='paragraph'
      />
      <Container>
        <S_Post>
          <Row gutter={{ dk: 3, lg: 3, xl: 3 }}>
            <Col tb={16} dk={16}>
              <Headline
                text={post.title || ''}
                align='left'
                as='h1'
              />
              {post.featuredImage?.node && (
                <FeaturedImage>
                  <WPImage
                     image={post.featuredImage.node}                     
                     objectFit='cover'
                 />
                </FeaturedImage>                              
              )} 
              <Body dangerouslySetInnerHTML={{ __html: post.content }} />
            </Col>
            <Col tb={8} dk={8}>
              <RecentPosts>
                <SidebarTitle>Recent Posts</SidebarTitle>
                {recentPosts.nodes.map((post, k) => (
                   <PostCond {...post} key={k} />
                 ))}
              </RecentPosts>

              <Categories>
                <SidebarTitle>Categories</SidebarTitle>
                <CategoriesList>
                  <ul>
                    {categories.nodes.map((category, k) => (
                       <li key={k}>
                         <Link href={category.uri || ''}>
                           <a>{category.name}</a>
                         </Link>
                       </li>
                     ))}
                  </ul>
                </CategoriesList>
              </Categories>
            </Col>
          </Row>
        </S_Post>
      </Container>        
    </Layout>
  )
}

const S_Post = styled.div`
  position: relative;
  padding: 50px 0;

  &:before {
    display: none;
    position: absolute;
    top: 0;
    left: calc(66.666% + 20px);
    content: '';
    width: 1px;
    height: 100%;
    background-color: ${p => p.theme.colors.ltgray};

    ${p => p.theme.media.minWidth('tablet')} {
      display: block;
      left: calc(66.666% + 5px);
    }

    ${p => p.theme.media.minWidth('desktop')} {
      left: calc(66.666% + 15px);
    }

    ${p => p.theme.media.minWidth('large')} {
      left: calc(66.666% + 15px);
    }

    ${p => p.theme.media.minWidth('xlarge')} {
      left: calc(66.666% + 20px);
    }
  }

  ${p => p.theme.media.minWidth('tablet')} {
    padding: 75px 0;
  }

  ${p => p.theme.media.minWidth('desktop')} {
    padding: 100px 0;
  }
`

const FeaturedImage = styled.div`
  margin: 0 0 40px 0;
`

const Body = styled(Rte)`
  margin: 0 0 50px 0;
`

const SidebarTitle = styled(H4)`
  margin: 0 0 30px 0;
`

const RecentPosts = styled.div`
  margin: 0 0 50px 0;

  ${p => p.theme.media.minWidth('desktop')} {
    margin: 0 0 75px 0;
  }
`

const Categories = styled.div``

const CategoriesList = styled(Rte)`
  li {
    line-height: 1.2;
  }

  a {
    ${p => p.theme.mixins.linkDecoration()};
    text-decoration: none !important;
    color: inherit !important;
  }
`

export default Post