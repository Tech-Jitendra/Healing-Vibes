import { Menu, Button, useMantineTheme } from '@mantine/core';
import { createStyle } from './BadgesMenu.styles';

function BadgesMenu() {
  const useStyles = createStyle();
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <Menu shadow="lg" width={190}>
      <Menu.Target>
        <Button variant="gradient" c={theme.colors.white[0]} radius="lg">
          Toggle Questions
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Questions</Menu.Label>
        <Menu.Item>
          <Button className={classes.badges}>My questions</Button>
        </Menu.Item>
        <Menu.Item>
          <Button className={classes.badges}>Ask questions</Button>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default BadgesMenu;
