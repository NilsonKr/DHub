import NextLink from 'next/link';
//UI
import { Grid, Text, Container, Link, Row } from '@nextui-org/react';

export const Header = () => {
	return (
		<Grid.Container
			alignItems='center'
			gap={2}
			css={{ marginTop: 40, width: '85%', margin: '0 auto' }}
		>
			<Grid xs={3}>
				<Text h1={true}> DMedia </Text>
			</Grid>
			<Grid xs={6}>
				<Row justify='space-around'>
					<NextLink href='/home'>
						<Link block color='primary'>
							<Text h3 color='primary'>
								Home
							</Text>
						</Link>
					</NextLink>
					<NextLink href='/gallery'>
						<Link block color='error'>
							<Text h3 color='error'>
								Gallery
							</Text>
						</Link>
					</NextLink>
					<NextLink href='/profile'>
						<Link block color='warning'>
							<Text h3 color='warning'>
								Profile
							</Text>
						</Link>
					</NextLink>
				</Row>
			</Grid>
			<Grid xs={3}>
				<Container css={{ height: 100, background: 'blue' }}></Container>
			</Grid>
		</Grid.Container>
	);
};
